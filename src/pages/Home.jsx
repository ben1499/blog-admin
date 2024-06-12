import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [ blogList, setBlogList ] = useState([]);

    const url = "http://localhost:3000";

    useEffect(() => {
        axios.get(`${url}/posts`)
        .then((res) => {
            setBlogList(res.data.data);
        })
    }, [])


    return (
        <div className="blog-list">
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