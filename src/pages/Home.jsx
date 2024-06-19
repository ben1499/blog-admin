import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [ blogList, setBlogList ] = useState([]);

    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${url}/posts`)
        .then((res) => {
            setBlogList(res.data.data);
        })
    }, [])


    return (
        <div className="blog-list">
            <Link to="/create"><button className="cus-btn">Create Post</button></Link>
            { blogList.map((post) => (
                <Link to={post._id} key={post._id}>
                    <div className="card">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>{post.timestamp_formatted}</p>
                    </div>
                </Link>
            )) }
        </div>
    )
}

export default Home;