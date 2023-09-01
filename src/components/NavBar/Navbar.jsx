import { Link } from "react-router-dom";
import "./NavBar.scss"
// new Header

const Navbar = ({ user, setIsLoading }) => {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
    setIsLoading(false)
  };

  return (
    <div className="navBar">

      <span className="navBar__logo">
        <Link className="link" to="/">
          MAD GABS
        </Link>
      </span>

      {user ? (
        <ul className="list">
          <li className="listItem">
            {/* <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            /> */}
          </li>
          <li className="listItem">UserName: {user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
      
    </div>
  )};

export default Navbar;
