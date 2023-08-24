import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../../components/Button/Button';
import "./Gabs.scss";

import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import YouWin from '../../components/YouWin/YouWin';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Gabs = () => {

  const { level } = useParams();

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  
  const [ currentGab, setCurrentGab ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${level}`)
      .then((res) => {
          let data = res.data;
          let randomIndex = Math.floor(Math.random() * data.length);
          setCurrentGab(data[randomIndex]);
          
          setTimeout(() => setIsLoading(false), 250);
        })
      }, []);
      

  // useEffect(() => {
  //   // console.log(currentGab[1])

  //   // if(currentGab && alreadySaid) {
  //   //   console.log(currentGab[1].sort().join(" ") === [...new Set(alreadySaid.filter(word => currentGab[1].includes(word)
  //   //     ))].sort().join(" "))
  //   // }
  // }, [alreadySaid]);


    
  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser does not support speech recognition.</span>
  }
      
    if (isLoading) {
    return <Loading />
  } 


  return (
          <div>

            <h2 className="current__gab">{currentGab[0]}</h2>

            <div className="gab__answer">
              {currentGab && 
                 
                currentGab[1].map((word, i) => {
                  transcript.split(" ").forEach(word => alreadySaid.push(word));
              
                  const isTranscriptWord = alreadySaid.includes(word);

                  return isTranscriptWord 
                    ? 
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
                  })}
            </div>

            <Button text={"Start Listening"} onClick={handleStartListening}/>
            <Button text={"Stop Listening"} onClick={handleStopListening} />

            {
            
            [...currentGab[1]].sort().join(" ") === [...new Set(alreadySaid.filter(word => currentGab[1].includes(word)))].sort().join(" ") &&

              <YouWin currentGab={currentGab}/>

            }

          </div>
    )};

export default Gabs;