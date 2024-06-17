import { useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

function BlogForm() {
    const [model, setModel] = useState({
        title: "",
        content: "",
        is_published: false
    });

    const [scope, setScope] = useState(null);

    const [checked, setChecked] = useState(false);

    const { pathname } = useLocation();
    const { postId }  = useParams();
    const url = "http://localhost:3000";
    
    const splitPath = pathname.split("/");

    useEffect(() => {
        setScope(splitPath[splitPath.length - 1]);
    }, [splitPath])

    useEffect(() => {
        if (scope === "edit") {
            axios.get(`${url}/posts/${postId}`)
            .then((res) => {
                setModel(res.data.data);
                if (res.data.data.is_published) {
                    setChecked(true);
                }
            })
        }
    }, [scope, postId])

    const submitData = (e) => {
        e.preventDefault();
        if (scope === "edit") {
            axios.put(`${url}/posts/${model._id}`, model)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(`${url}/posts`, model)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const handleModelChange = (field) => {
        return (e) => {
            console.log(e.target.value);
            if (field === "title") 
                setModel({ ...model, title: e.target.value })
            else if (field === "content")
                setModel({ ...model, content: e.target.value })
            else {
                setChecked((prevState) => !prevState)
                setModel({ ...model, is_published: !model.is_published })
            }
        }
    }

    return (
        <div className="form-container">
            <form action="">
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" onChange={handleModelChange("title")} value={model.title} />
                </div>
                <div className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea name="" id="content" rows="20" onChange={handleModelChange("content")} value={model.content}></textarea>
                </div>
                <div>
                    <input id="publish" type="checkbox" onChange={handleModelChange("is_published")} checked={checked}/>
                    <label htmlFor="publish">Publish?</label>
                </div>
                {scope === "edit" ? (<button onClick={submitData}>Update</button>) : <button onClick={submitData}>Submit</button>}
            </form>
        </div>
    )
}

export default BlogForm;