import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function BlogPost() {
    const { postId } = useParams();

    const [ post, setPost ] = useState({});
    const [ comments, setComments ] = useState([]);

    const [ model, setModel ] = useState({
        author_name: null,
        content: null,
        post_id: postId
    })

    const url = "http://localhost:3000";

    const fetchComments = () => {
        axios.get(`${url}/posts/${postId}/comments`)
        .then((res) => {
            setComments(res.data.data);
        })
    }

    useEffect(() => {
        axios.get(`${url}/posts/${postId}`)
        .then((res) => {
            setPost(res.data.data);
        })

        axios.get(`${url}/posts/${postId}/comments`)
        .then((res) => {
            setComments(res.data.data);
        })

    }, [postId])

    const handleModelChange = (e, field) => {
        if (field === "name") {
            setModel({
                ...model,
                author_name: e.target.value
            })
        } else {
            setModel({
                ...model,
                content: e.target.value
            })
        }
    }

    const postComment = (e) => {
        e.preventDefault();

        axios.post(`${url}/comments`, model)
        .then((res) => {
            fetchComments();
        }).catch((err) => console.log(err))
    }

    return (
        <div className="blog-view-container">
            <div className="form-btns">
                <Link to={`/${post._id}/edit`}><button className="edit-btn">Edit</button></Link>
                <Link to={`/${post._id}/edit`}><button className="edit-btn">Delete</button></Link>
            </div>

            <h2>{ post.title }</h2>
            <p>{post.timestamp_formatted}</p>
            <p className="blog-view-content">{ post.content }</p>

            <div className="comment-create-container">
                <h3>Post a comment</h3>
                <form>
                    <div className="form-control">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" onChange={(e) => handleModelChange(e, "name")} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="content">Content</label>
                        <textarea name="" id="content" onChange={(e) => handleModelChange(e, "content")} required></textarea>
                    </div>
                    <button type="submit" className="cus-btn mt-1" disabled={!(model.author_name && model.content)} onClick={postComment}>Post Comment</button>
                </form>
            </div>

            <div className="comment-container">
                <h3>Comments:</h3>
                { comments.length ? (
                    <div>
                        {comments.map((comment) => (
                            <div className="comment" key={comment._id}>
                                {comment.content}
                                <div className="d-flex justify-content-between">
                                    <p>By: {comment.author_name}</p>
                                    <p>{comment.timestamp_formatted}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p>No Comments. Post a comment!</p>
            }
            </div>
        </div>
    )
}

export default BlogPost;