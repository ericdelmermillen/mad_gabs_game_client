import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '../../components/Button/Button';
import "./Gabs.scss";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';


const Gabs = () => {
  
  const {
    // finalTranscript,
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [gabsArray, setGabsArray] = useState([]);
  const [currentGab, setCurrentGab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transcriptArr, setTranscriptArr] = useState([transcript.split(" ")]);
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
          setGabsArray(data);
          let randomIndex = Math.floor(Math.random() * data.length);
          setCurrentGab(data[randomIndex]); 
          setTimeout(() => setIsLoading(false), 250);
        })
      }, []);
    

  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser doesn't support speech recognition.</span>;
  }
      
    if (isLoading) {
    return <Loading />
  } 

  currentGabAnswer = [...currentGab[1]]

console.log(transcript)
  return (
          <div>
            {/* {transcript} */}
            <h2 className="current__gab">{currentGab[0]}</h2>

            <div className="gab__answer">
              {currentGab &&
                
                currentGabAnswer.map((word, i) => {
                  const alreadySpoken = [...new Set(transcript.split(" "))];
                  const isTranscriptWord = alreadySpoken.includes(word);

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