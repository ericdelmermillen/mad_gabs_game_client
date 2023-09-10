import { useState, useEffect } from "react";
import "./Welcome.scss";
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Welcome = ({ setUser, mgUserId }) => {
  const [userName, setUserName] = useState("");

  // mgUserId = 13;
  // console.log("user.mgUserId:", user.mgUserId)
  console.log("mgUserId: ", mgUserId)

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

      toast.success(`🤓 Welcome aboard ${userName}!`, {
        toastId: "welcome-toast"
      });

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
      <div className="welcome__card">

        <h1 className="welcome__heading">Please choose a UserName</h1>
        <form onSubmit={handleSubmit} className="welcome-form">
          <label className="welcome-form__userNameLabel" htmlFor="welcome-form__userName">
            Username:
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

          <div className="button__container">
            <button type="submit" className="button--submit-gab">
              Submit
            </button>
          </div>
        </form>

        <ToastContainer 
          autoClose={2000}
          closeOnClick
          draggable
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          position="bottom-center"
          theme="light"
          className="not-selected__toast"
          bodyStyle={{color: "#333"}}
          transition={Flip}
        />
      </div>
      </div>
    </div>
  )};

export default Welcome;
