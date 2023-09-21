import "./Gab.scss";
import micOn from "../../assets/icons/mic_on.svg"

import { Link } from 'react-router-dom';

import axios from 'axios';
import chevronRight from "../../assets/icons/chevron-right.svg"

import Loading from '../../components/Loading/Loading';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Gab = ({ 
  currentGab, setCurrentGab, 
  handleSkip, 
  isLoading, setIsLoading, 
  isTimeElapsed, 
  readyForNext, setReadyForNext, 
  roundOver, setRoundOver, 
  setEndTime,
  setGabIsReady, 
  setStartTime, 
  setYouWin, 
  youGiveUp, setYouGiveUp, 
}) => {

  const [ isListening, setIsListening ] = useState(false);  
  
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { level } = useParams();

  const alreadySaid = [];
  

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  
  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setTimeout(() => setIsListening(true), 500);
    console.log("start listening");
  }

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setTimeout(() => setIsListening(false), 500);
    resetTranscript();
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
        const token = sessionStorage.getItem('token');

        if(!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${BASE_URL}gabs`, {
          params: { level: level },
          headers: { Authorization: `Bearer ${token}`}
          }
        )

        const data = response.data;

        setCurrentGab([[data.question], data.answer.split(" ")]);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); 
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
        setEndTime(new Date().getTime())
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

      {currentGab[0] && <h2 className="gab__current-gab">"{currentGab[0]}"</h2>}

      <div className="gab__answer">

        <div className="answer-word__container">
          
          {currentGab[1] && 
          
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
            {isListening &&
            <>
                <img className="microphone" src={micOn} alt="microphone listening icon" />
                <div className="microphone__blob"></div>
            </>
            }
          </div>

          {isLoading
          
          ?
          <span className="skip" onClick={() => console.log("Still loading bro")}>
              Skip
              <img className="skip__chevron" src={chevronRight} alt="skip icon"/>
          </span>

          :

          <span className="skip" onClick={handleSkip}>
              Skip
              <img className="skip__chevron" src={chevronRight} alt="skip icon"/>
          </span>

          }

      </div>

      <Link className="giveUp__button" 
        onClick={handleGiveUp} >
        Give Up
      </Link>
    </div>
  )};

export default Gab;