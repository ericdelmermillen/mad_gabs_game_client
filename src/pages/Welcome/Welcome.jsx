import "./Welcome.scss";
import axios from 'axios';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Welcome = ({ setUser, mgUserId, setLevel }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();  

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userName === "") {
      toast.error("🙄 A Username is required...");
      return;
    } 

    if (userName.trim(" ").length <= 2) {
      toast.error("🙄 Username too short...");
      return;
    } 
      
    try {
      const token = sessionStorage.getItem('token');

      if(!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(`${BASE_URL}users/username`, {
        mgUserId: mgUserId,
        userName: userName,
    }, {headers: { Authorization: `Bearer ${token}`}
  })
      toast.success(`🤓 Welcome aboard ${userName}!`);
      setUser(response.data.user);
      setLevel("");
      navigate("/home");

    } catch (error) {
      toast.error(`🙄 ${error.response.data.error}...`);
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