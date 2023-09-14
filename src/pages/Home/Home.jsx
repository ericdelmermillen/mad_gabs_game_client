import "./Home.scss";
// import logo from "../../assets/logo/logo.svg";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from 'react-speech-recognition';
import SubmitGab from "../../components/SubmitGab/SubmitGab";

import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ level, setLevel, showHowToPlay, setShowHowToPlay}) => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [showSubmitGab, setShowSubmitGab] = useState(false);

  const showToast = () => {
    toast('🙄 Please select a Level first...', {
    toastId: 'levelSelection',});
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser doesn't support speech recognition.</span>;
  }

  const setLevelHandler = (level) => {
    setLevel(level);
  }

  return (

      <div className="home">

        {showSubmitGab &&
          <SubmitGab
          setShowSubmitGab={setShowSubmitGab}
          />
        }

        <div className="home__container">

          <h2 className="home__heading">
            "It’s Not What You Say… 
            <span className="home__heading--secondLine">...It’s how you say it"</span>
          </h2>

          <h3 className="home__sub-heading">Choose your level: </h3>

          <div className="level__links">

            {level === "easy" 
              ?
              <Link className="level__option--selected" 
              onClick={() => setLevelHandler("easy")}>
                Easy
              </Link>
              :
              <Link className="level__option" 
              onClick={() => setLevelHandler("easy")}>
                Easy
              </Link>
            }

            {level === "medium" 
              ?
              <Link className="level__option--selected" 
                onClick={() => setLevelHandler("medium")}>
                  Medium
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
                Hard
              </Link>
              :
              <Link className="level__option" 
              onClick={() => setLevelHandler("hard")}>
                Hard
              </Link>
            }

          </div>

          <span 
            className="howToPlay-span" 
            onClick={() => setShowHowToPlay(!showHowToPlay)}
            >
              How To Play
          </span>

          <div className="home__button-container">
            {level !== "" ?

            <Link className="home__button--play" 
              to={`/gabs/${level}`}>
              Play
            </Link>

            :
            <Link className="home__button--play-disabled" 
              onClick={showToast }>
                Play
            </Link>
            }

          </div>
        </div>
      </div>

  )};

export default Home;