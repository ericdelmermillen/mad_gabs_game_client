import { useState } from "react";
import "./SubmitGab.scss";
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitGab = ({ setShowSubmitGab }) => {
  const [gabQuestion, setGabQuestion] = useState("");
  const [gabAnswer, setGabAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (gabQuestion === "" || gabAnswer === "") {
      toast.error("🙄 All fields are required...");
      return;
    } 
      
    try {
      const response = await axios.post(`http://localhost:8080/submit/gab`, {
      suggestedGab: gabQuestion,
      gabAnswer: gabAnswer,
    });
      
      console.log("Server response:", response.data);
      setShowSubmitGab(false)
      
      toast.success("🤓 Thanks for the Gab!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="submitGab__card">
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
  );
};

export default SubmitGab;
