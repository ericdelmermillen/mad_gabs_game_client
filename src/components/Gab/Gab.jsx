import "./Gab.scss";

import axios from 'axios';

import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import YouWin from '../../components/YouWin/YouWin';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Gab = ({ duration, handleGabsIsReady, isTimeElapsed }) => {

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
  
  let currentGabAnswer;

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
    axios
      .get(`http://localhost:8080/${level}`)
      .then((res) => {
          let data = res.data;
          let randomIndex = Math.floor(Math.random() * data.length);
          setCurrentGab(data[randomIndex]);
          
          setTimeout(() => {
            setIsLoading(false);
            handleGabsIsReady();
            setStartTime(new Date().getTime())
          }, 250);

          handleStartListening();
        })
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
            
            // console.log(`startTime: ${startTime}`)
            // console.log(`endTime - startTime: ${endTime - startTime}`)
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

      </div>
    </div>
  )};

export default Gab;