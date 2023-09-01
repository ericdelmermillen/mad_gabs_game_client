import { Link } from "react-router-dom";
import "./NavBar.scss"
import logo from "../../assets/logo/1.svg";
// import logo from "../../assets/logo/2.svg";
// import logo from "../../assets/logo/3.svg";
// import logo from "../../assets/logo/4.svg";
// import logo from "../../assets/logo/5.svg";
// import logo from "../../assets/logo/6.svg";
// import logo from "../../assets/logo/7.svg";
// import logo from "../../assets/logo/8.svg";
// import logo from "../../assets/logo/9.svg";
// import logo from "../../assets/logo/10.svg";

// import x from "../../assets/icons/x-1.svg"
import x from "../../assets/icons/x-2.svg"
// import x from "../../assets/icons/x-3.svg"

const Navbar = ({ user, setIsLoading }) => {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
    setIsLoading(false)
  };

  return (
    <div className="navBar">

      <img className="navBar__close" src={x} alt="Logo"/>

      {user ? (

        <>

          <p className="navBar__userName">Username : {user.displayName}</p>

          <ul className="navBar__levels">
            <li className="navBar__level--easy">Easy</li>
            <li className="navBar__level--medium">Medium</li>
            <li className="navBar__level--hard">Hard</li>
          </ul>

          <span className="navBar__submitGab">Submit A Gab</span>
            
          <Link className="navBar__logo" to="/"><img className="" src={logo} alt="Logo"/></Link>

          <div className="navBar__dashboard">
            <ul className="navBar__stats">
              <li className="navBar__stat--points">Total Points: 0</li>
              <li className="navBar__stat--rank"><span className="navBar__rank-span">Global Rank :</span> 0</li>
            </ul>
            <ul className="navBar__actions">
              <li className="navBar__action--submit" onClick={logout}>Submit</li>
              <li className="navBar__action--logout" onClick={logout}>Logout</li>
            </ul>
          </div>
        
        </>

          ) : (

        <>
          <p className="navBar__userName">Username : Logged Out</p>

          <ul className="navBar__levels">
            <li className="navBar__level--easy">Easy</li>
            <li className="navBar__level--medium">Medium</li>
            <li className="navBar__level--hard" >Hard</li>
          </ul>
          
          <span className="navBar__submitGab">Submit A Gab</span>

          <Link className="navBar__logo" to="/"><img className="" src={logo} alt="Logo"/></Link>

          <ul className="navBar__stats">
            <li className="navBar__stat">Total Points: 0</li>
            <li className="navBar__stat"><span className="navBar__rank-span">Global Rank :</span> 0</li>
            <Link className="link" to="login"><li className="navBar__stat">Login</li></Link>
          </ul>

        </>

      )}
      
    </div>
  )};

export default Navbar;
