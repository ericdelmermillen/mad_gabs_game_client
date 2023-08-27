import { useState } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from 'react-speech-recognition';
import "./Home.scss";


import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [level, setLevel] = useState("");

  const showToast = () => {
    // toast("😒 Please select a Level first buddy...")
    toast("🙄 Please select a Level first...")
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser doesn't support speech recognition.</span>;
  }

  const setLevelHandler = (level) => {
      setLevel(level);
  }

  return (
      <div className="home">

        <h2 className="home__heading">"It’s Not What You Say… <br></br>...It’s how you say it"</h2>
        <h3 className="home__sub-heading">Choose your level: </h3>
        <div className="level__links">

          {level === "easy" 
            ?
            <Link className="level__option--selected" 
              onClick={() => setLevelHandler("easy")}>
                <span className="">Easy</span>
            </Link>
            :
            <Link className="level__option" 
              onClick={() => setLevelHandler("easy")}>
                <span className="">Easy</span>
            </Link>
          }

          {level === "medium" 
            ?
            <Link className="level__option--selected" 
              onClick={() => setLevelHandler("medium")}>
                <span className="">Medium</span>
            </Link>
            :
            <Link className="level__option" 
              onClick={() => setLevelHandler("medium")}>
                <span className="">Medium</span>
            </Link>
          }

          {level === "hard" 
            ?
            <Link className="level__option--selected" 
              onClick={() => setLevelHandler("hard")}>
                <span className="">Hard</span>
            </Link>
            :
            <Link className="level__option" 
              onClick={() => setLevelHandler("hard")}>
                <span className="">Hard</span>
            </Link>
          }

        </div>

        <div className="button__container">
          {level !== "" ?

            <Link className="button--play" 
            to={`/${level}`}
            >
              Play
            </Link>
          :
            <Link className="button--play-disabled" 
            onClick={showToast }
            >
              Play
            </Link>
          }
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
            // transition={Zoom}
            transition={Flip}
          />

        </div>

      </div>
  )};

export default Home;