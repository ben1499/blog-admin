import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {

    const [isLogged, setLogged] = useState(false);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, [token])

    const logOut = () => {
        localStorage.removeItem("token");
        setLogged(false);
        navigate("/");
    }

    return (
        <header className="d-flex justify-content-between">
            <Link to="/">
                <h1>The Cool Blog</h1>
            </Link>
            <ul>
                {isLogged ?  
                    <li style={{cursor: "pointer"}} onClick={logOut}>Logout</li>
                :
                <Link to="/login">
                    <li>Login</li>
                </Link>
            }
            </ul>
        </header>
    )
}

export default Header;