import "./Gab.scss";

import axios from 'axios';

import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import YouLose from '../../components/YouLose/YouLose';
import YouWin from '../../components/YouWin/YouWin';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Gab = ({ duration, handleGabIsReady, isTimeElapsed }) => {
  const { level } = useParams();
  
  const msToSeconds = (ms) => Math.round(ms / 100) / 10;
  
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [ currentGab, setCurrentGab ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ roundOver, setRoundOver ] = useState(false);
  const [ youWin, setYouWin ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ roundTime, setRoundTime ] = useState(null);

  const alreadySaid = [];
  
  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    console.log("start listening");
  }

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${level}`);
        const data = response.data;
  
        setCurrentGab(data);
        setIsLoading(false);
        handleGabIsReady();
        setStartTime(new Date().getTime());
  
        handleStartListening();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if(currentGab && !isTimeElapsed) {
      
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
      <h2 className="current__gab">{currentGab[0]}</h2>

      <div className="gab__answer">
        
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

          <Button 
            className="stopListeningButton"
            text={"Stop Listening"} 
            onClick={handleStopListening}
          />

          {
            youWin && 
              <YouWin 
                currentGab={currentGab}
                roundTime={msToSeconds(roundTime)}
                duration={duration}
              />
          }

          { !youWin && isTimeElapsed && <YouLose /> }


      </div>
    </div>
  )};

export default Gab;