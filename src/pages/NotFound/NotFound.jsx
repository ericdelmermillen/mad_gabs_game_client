import { Link } from "react-router-dom";
import "./NotFound.scss"

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFound__container">

        <h1 className="notFound__heading">Not Found!</h1>
        <h2 className="notFound__sub-heading">Nothing to see here...</h2>

        <div className="notFound__button-container">
          <Link 
            className="notFound__home"
            to="/"
          >
            Home</Link>
        </div>
      </div>

    </div>
  )};

export default NotFound;