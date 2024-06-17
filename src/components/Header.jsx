import { Link } from "react-router-dom";

function Header() {

    return (
        <header className="d-flex justify-content-between">
            <Link to="/">
                <h1>The Cool Blog</h1>
            </Link>
            <ul>
                <Link to="/login">
                    <li>Login</li>
                </Link>
            </ul>
        </header>
    )
}

export default Header;