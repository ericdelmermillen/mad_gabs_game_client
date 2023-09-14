import { useState } from "react";
import "./SubmitGab.scss";
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitGab = ({ showSubmitGab, setShowSubmitGab }) => {

  const [gabQuestion, setGabQuestion] = useState("");
  const [gabAnswer, setGabAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (gabQuestion === "" || gabAnswer === "") {
      toast.error("🙄 All fields are required...");
      return;
    } 
      
    try {

      const token = sessionStorage.getItem('token');

      if(!token) {
        throw new Error("No token found");
      }
      
      const response = await axios.post(`http://localhost:5000/submit/gab`, {
      suggestedGab: gabQuestion,
      gabAnswer: gabAnswer,
    }, {headers: { Authorization: `Bearer ${token}`}
  }) 
    if(response.status === 201) {
      setShowSubmitGab(!showSubmitGab)      
      toast.success("🤓 Thanks for the Gab!");
    } 
    } catch (error) {
      window.open("http://localhost:5000/auth/logout", "_self");
      console.error("Error:", error);
    }
  };

  return (
    <div className="submitGab">

      <div className="submitGab__container">

        <h1 className="submitGab__heading">Submit a Gab</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="form__questionLabel" htmlFor="form__questionInput">
            Gab Question:
          </label>
          <input
            className="form__questionInput"
            id="form__questionInput"
            name="form__questionInput"
            placeholder="Enter your Gab"
            type="text"
            value={gabQuestion}
            onChange={(e) => setGabQuestion(e.target.value)}
          />

          <label className="form__answerLabel" htmlFor="form__answerInput">
            Gab Answer:
          </label>
          <input
            className="form__answerInput"
            id="form__answerInput"
            type="text"
            name="form__answerInput"
            placeholder="And what it sounds like"
            value={gabAnswer}
            onChange={(e) => setGabAnswer(e.target.value)}
          />

          <p className="submitGab__instructions">
            Think you've got a great Gab? Send it along. 
          </p>

          <div className="submitGab__button-container">
            
            <span 
              className="button--submit-cancel"
              onClick={() => setShowSubmitGab(!showSubmitGab)}
            >
              Cancel
            </span>
            
            <button 
              type="submit"
              className="button--submit-gab"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  )};

export default SubmitGab;
