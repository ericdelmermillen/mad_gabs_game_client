import "./Home.scss";

import { Link } from "react-router-dom";
import { useSpeechRecognition } from 'react-speech-recognition';

import HowToPlay from "../../components/HowToPlay/HowToPlay";

import { toast } from 'react-toastify';

const Home = ({ level, setLevel, setShowHowToPlay, showHowToPlay }) => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleNoLevelSelected = () => {
    toast('🙄 Please select a Level first...');
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser doesn't support speech recognition.</span>;
  }

  const setLevelHandler = (level) => {
    setLevel(level);
  }

  return (

      <div className="home">

        <div className="home__container">
        
        {showHowToPlay 
        
        && 
        
        <HowToPlay setShowHowToPlay={setShowHowToPlay} showHowToPlay={showHowToPlay}/>
        
        }

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
              onClick={handleNoLevelSelected }>
                Play
            </Link>

            }

          </div>
        </div>
      </div>
  )};

export default Home;