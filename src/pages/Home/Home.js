import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useSpeechRecognition } from 'react-speech-recognition';
import "./Home.scss";


const Home = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [level, setLevel] = useState("");

  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, this browser doesn't support speech recognition.</span>;
  }

  const setLevelHandler = (level) => {
      setLevel(level);
  }

  return (
      <div className="home">
        <h2 className="section__heading">"It’s Not What You Say… <br></br>It’s how you say it"</h2>
        <h3 className="section__sub-heading">Choose your level</h3>
        <div className="level__links">
          <Link className="level__easy" onClick={() => setLevelHandler("easy")}>Easy</Link>
          <Link className="level__medium" onClick={() => setLevelHandler("medium")}>Medium</Link>
          <Link className="level__hard" onClick={() => setLevelHandler("hard")}>Hard</Link>
        </div>
        <Button text={"Ready!"} path={`/${level}`} />
      </div>
  )};

export default Home;