import "./Home.scss";
import logo from "../../assets/logo/logo.svg";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from 'react-speech-recognition';
import SubmitGab from "../../components/SubmitGab/SubmitGab";
import HowToPlay from "../../components/HowToPlay/HowToPlay";

import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [level, setLevel] = useState("");
  const [showSubmitGab, setShowSubmitGab] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

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

        {showHowToPlay && 
        
        <HowToPlay 
          setShowHowToPlay={setShowHowToPlay}
          showHowToPlay={showHowToPlay}
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

          <span 
            className="howToPlay-span" 
            onClick={() => setShowHowToPlay(!showHowToPlay)}>
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