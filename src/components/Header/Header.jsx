import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    return (
        <div className="header">
            <Link to="/home">
                <h1 className="header__logo">MAD GABS</h1>
            </Link>
        </div>
    )};

export default Header;