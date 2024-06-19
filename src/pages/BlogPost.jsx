import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../config/https";

function BlogPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [ post, setPost ] = useState({});
    const [ comments, setComments ] = useState([]);
    const [ publishChecked, setPublishChecked ] = useState(false);

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
            if (res.data.data.is_published) {
                setPublishChecked(true);
            }
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

    const handlePostDelete = () => {
        axiosInstance.delete(`${url}/posts/${postId}`)
        .then(() => {
            navigate("/");
        })
        .catch((err) => {
            if (err.response.status === 403) {
                navigate("/login", {state: { from: location }});
            }
        })
    }

    const deleteComment = (commentId) => {
        return () => {
            axiosInstance.delete(`${url}/comments/${commentId}`)
            .then(() => {
                fetchComments();
            }).catch((err) => {
                if (err.response.status === 403) {
                    navigate("/login", {state: {from: location}});
                }
            });
        }
    }

    const togglePublished = () => {
        axiosInstance.put(`${url}/posts/${post._id}`, {
            ...post,
            is_published: !post.is_published
        })
        .then(() => {
            setPost({...post, is_published: !post.is_published})
            setPublishChecked(!publishChecked);
        }).catch((err) => {
            if (err.response.status === 403) {
                navigate("/login", {state: {from: location}});
            }
        })
    }

    return (
        <div className="blog-view-container">
            <div className="action-container">
                <div className="action-btns">
                    <Link to={`/${post._id}/edit`}><button>Edit</button></Link>
                    <button onClick={handlePostDelete}>Delete</button>
                </div>
                <div>
                    <label htmlFor="">Publish?  </label>
                    <input type="checkbox" onChange={togglePublished} checked={publishChecked} />
                </div>
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
                                <button className="comment-delete-btn" onClick={deleteComment(comment._id)}>Delete</button>
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