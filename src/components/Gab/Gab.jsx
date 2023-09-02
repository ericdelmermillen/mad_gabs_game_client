import "./Gab.scss";
import micOn from "../../assets/icons/mic_on.svg"

import { Link } from 'react-router-dom';

import axios from 'axios';
import chevronRight from "../../assets/icons/chevron-right.svg"

import Loading from '../../components/Loading/Loading';
import YouLose from '../../components/YouLose/YouLose';
import YouGiveUp from '../../components/YouGiveUp/YouGiveUp';
import YouWin from '../../components/YouWin/YouWin';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Gab = ({ duration, handleIsTimeElapsed, isTimeElapsed, setGabIsReady, setIsTimeElapsed, gabIsReady }) => {
  const { level } = useParams();
  const navigate = useNavigate();
  const msToSeconds = (ms) => Math.round(ms / 100) / 10;
  const alreadySaid = [];
  
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [ currentGab, setCurrentGab ] = useState(null);
  const [ isListening, setIsListening ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ roundOver, setRoundOver ] = useState(false);
  const [ roundTime, setRoundTime ] = useState(null);
  const [ startTime, setStartTime ] = useState(null);
  const [ youWin, setYouWin ] = useState(false);
  const [ youGiveUp, setYouGiveUp ] = useState(false);
  const [ readyForNext, setReadyForNext ] = useState(false);
  
  
  const handleNext = () => {
    setCurrentGab(null);
    setIsLoading(true);
    setReadyForNext(true);
    setRoundOver(false);
    setRoundTime(null);
    setStartTime(null);
    setYouGiveUp(false);
    setYouWin(false);
    setGabIsReady(false);
    navigate(`/${level}`, { replace: true });
  }
  
  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setTimeout(() => setIsListening(true), 500);
    console.log("start listening");
  }

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setTimeout(() => setIsListening(false), 500);
    console.log("stop listening");
  }

  const handleYouWin = () => {
    setRoundOver(true);

    handleStopListening();  

    setTimeout(() => {
      setYouWin(true);
      resetTranscript();
    }, 750);
  }

  const handleGiveUp = () => {
    setRoundOver(true);

    handleStopListening();  

    setTimeout(() => {
      setYouGiveUp(true);
      resetTranscript();
    }, 750);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/gabs`, {params: {level: level}});
        const data = response.data;

        setCurrentGab([[data.question], data.answer.split(" ")]);
        setIsLoading(false);
        setGabIsReady(true);
        setStartTime(new Date().getTime());
  
        handleStartListening();
        setReadyForNext(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [readyForNext]);


  useEffect(() => {
    if(currentGab && !isTimeElapsed && !youGiveUp) {
      
      const isWinningConditionMet =
      [...currentGab[1]].sort().join(" ") ===
      [...new Set(alreadySaid.filter(word => currentGab[1].includes(word)))].sort().join(" ") &&
      !roundOver;
      
      if(isWinningConditionMet) {
        handleYouWin()
        const endTime = new Date().getTime(); 
        setRoundTime(endTime - startTime)
      };
    }
  }, [currentGab, alreadySaid, roundOver]);
    
    
    if (!browserSupportsSpeechRecognition) {
      return <span>Sorry, this browser does not support speech recognition.</span>
  }
      
    if (isLoading) {
    return <Loading />
  } 

  return (
    <div className="gab">
      {console.log(transcript)}

      <h2 className="gab__current-gab">"{currentGab[0]}"</h2>

      <div className="gab__answer">

        <div className="answer-word__container">
          
          {currentGab && 
          
            currentGab[1].map((word, i) => {
              transcript.split(" ").forEach(word => alreadySaid.push(word));
          
              const isTranscriptWord = alreadySaid.includes(word);
              return isTranscriptWord && !isTimeElapsed ?
          
                <span className="answer-word__span" key={i}>
                  <p className="alreadySpoken" key={i}>
                    {word.slice(0, 1).toUpperCase() + word.slice(1)}
                  </p>
                </span>
                  :
                <span className="answer-word__span" key={i}>
                  <p className="notAlreadySpoken" key={i}>
                    {word}
                  </p>
                </span>
              })
            }
          
        </div>
        
          <div className="microphone">
            {isListening ?
            
                <img className="microphone--on" src={micOn} alt="microphone listening icon" />
              :
                <img className="microphone--off" src={micOn} alt="microphone listening icon" />
            }
          </div>

          <span 
            className="skip" 
            onClick={() => console.log("Skip")}>
              Skip<img className="skip__chevron" src={chevronRight} alt="skip icon"/> 
          </span>

          <div className="giveUp__container">
            <Link className="giveUp" 
              onClick={handleGiveUp} >
              Give Up
            </Link>
          </div>

      </div>

      { youWin && 
        <YouWin 
          currentGab={currentGab}
          roundTime={msToSeconds(roundTime)}
          duration={duration}
          handleNext={handleNext} />
      }

      { !youWin && isTimeElapsed && !youGiveUp && 
        <YouLose 
          currentGab={currentGab}
          handleNext={handleNext} /> 
      }
          
      { !youWin && youGiveUp && 
        <YouGiveUp 
          currentGab={currentGab}
          handleNext={handleNext} /> 
      }

    </div>
  )};

export default Gab;