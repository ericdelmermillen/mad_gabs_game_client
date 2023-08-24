import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../../components/Button/Button';
import "./Gabs.scss";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';


const Gabs = () => {

  const {
    transcript,
    interimTranscript,
    finalTranscript,

    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  
  const [currentGab, setCurrentGab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const alreadySaid = [];


  let currentGabAnswer =[];

  const { level } = useParams();

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


  useEffect(() => {

    transcript.split(" ").forEach(word => {
      alreadySaid.push(word)
    })

  console.log(currentGabAnswer.sort().join(" ") === [...new Set(alreadySaid.filter(word => currentGabAnswer.includes(word)
  ))].sort().join(" "))

    console.log(alreadySaid)
  }, [transcript]);


    
  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser does not support speech recognition.</span>
  }
      
    if (isLoading) {
    return <Loading />
  } 

  currentGabAnswer = [...currentGab[1]]
  // console.log(currentGabAnswer)

  return (
          <div>
            {/* {transcript} */}
            {/* {interimTranscript} */}
            {/* {finalTranscript} */}
            
            <h2 className="current__gab">{currentGab[0]}</h2>

            <div className="gab__answer">
              {currentGab &&
                
                currentGabAnswer.map((word, i) => {
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

          </div>
    )};

export default Gabs;