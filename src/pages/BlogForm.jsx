import { useState } from "react";
import axios from "axios";

function BlogForm() {
    const [model, setModel] = useState({
        title: null,
        content: null,
        is_published: false
    });

    const url = "http://localhost:3000";
    const submitData = (e) => {
        e.preventDefault();

        axios.post(`${url}/posts`, model)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleModelChange = (field) => {
        return (e) => {
            console.log(e.target.value);
            if (field === "title") 
                setModel({ ...model, title: e.target.value })
            else if (field === "content")
                setModel({ ...model, content: e.target.value })
            else
                setModel({ ...model, is_published: !model.is_published })
        }
    }

    return (
        <div className="form-container">
            <form action="">
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" onChange={handleModelChange("title")} />
                </div>
                <div className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea name="" id="content" rows="20" onChange={handleModelChange("content")}></textarea>
                </div>
                <div>
                    <input id="publish" type="checkbox" onChange={handleModelChange("is_published")} />
                    <label htmlFor="publish">Publish?</label>
                </div>
                <button onClick={submitData}>Submit</button>
            </form>
        </div>
    )
}

export default BlogForm;