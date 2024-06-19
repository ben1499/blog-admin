import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
    const url = import.meta.env.VITE_API_URL;
    const [model, setModel] = useState({ username: "", password: "" });
    const [ error, setError ] = useState(null);

    const location = useLocation();


    const formRef = useRef();

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        e.target.reportValidity();

        if (formRef.current.reportValidity()) {
            axios.post(`${url}/login`, model)
            .then((res) => {
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }).catch((err) => {
                setError(err.response.data);
            })
        }
    }

    const handleModelChange = (field) => {
        return (e) => {
            if (field === "uname") {
                setModel({ ...model, username: e.target.value })
            } else {
                setModel({ ...model, password: e.target.value })
            }
        }
    }

    return (
        <div className="login-container">
            {location.state ? <p className="mb-1">Please login to perform actions</p> : null}
            <form ref={formRef} action="">
                <div className="form-control">
                    <label htmlFor="">Username</label>
                    <input type="text" required onChange={handleModelChange("uname")} />
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type="password" required onChange={handleModelChange("pwd")} />
                </div>
                <button className="cus-btn" onClick={submitForm}>Submit</button>
            </form>
            {
                error 
                ? error.errors 
                    ? (<ul>
                       { error.errors.map((item, index) => <li key={index}>{item.msg}</li>)}
                        </ul>) 
                    : <p>{error.message}</p>
                : null
            }
        </div>
    )
}

export default Login;