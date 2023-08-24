import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ text, path, onClick }) => {
  return (
    <Link to={path} >
    <button className="btn" onClick={onClick}>
     
      <span className="btn__text">{text}</span>
    </button>
    </Link>
  );
};

export default Button;
