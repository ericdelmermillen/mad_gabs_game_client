import "./Welcome.scss";
import axios from 'axios';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Welcome = ({ setUser, mgUserId }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userName === "") {
      toast.error("🙄 A Username is required...", {toastId: "usernameIncomplete-toast"});
      return;
    } 
      
    try {
      const token = sessionStorage.getItem('token');

      if(!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(`http://localhost:5000/users/username`, {
        mgUserId: mgUserId,
        userName: userName,
    }, {headers: { Authorization: `Bearer ${token}`}
  })
      toast.success(`🤓 Welcome aboard ${userName}!`);

      setUser(response.data.user);
      navigate("/home");

    } catch (error) {
      window.open("http://localhost:5000/auth/logout", "_self");
      console.error("Error:", error);
    }
  };

  return (
    <div className="welcome">
      <div className="welcome__container">

        <h1 className="welcome__heading">Please choose a UserName</h1>
        <form onSubmit={handleSubmit} className="welcome-form">
          <label className="welcome-form__userNameLabel" htmlFor="welcome-form__userName">
          </label>
          <input
            className="welcome-form__userName-input"
            id="welcome-form__userName"
            name="welcome-form__userName"
            placeholder="Choose a Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <div className="welcome-form__info-container">
              <p className="welcome-form__info">
                *User names are used for the Leader Board.
              </p>
            </div>

          <div className="welcome-form__button-container">
            <button type="submit" className="button--submit-gab">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )};

export default Welcome;
