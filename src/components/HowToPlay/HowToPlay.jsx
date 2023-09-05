import "./HowToPlay.scss"
import { Link } from 'react-router-dom';

const HowToPlay = ({setShowHowToPlay, showHowToPlay}) => {
  return (

<div className="howToPlay__card">

<h1 className="howToPlay__heading">How To Play</h1>
  <p className="howToPlay__instructions">
    Mad Gabs is a reading and speaking game where you need to listen to how you sound while reading the cue phrase to figure out what the secret answer is.
  </p>
  
  <p className="howToPlay__instructions">
    In order to win a round you must say the phrase clearly enough so that the mic can hear the secret word. 
  </p>
  
  <p className="howToPlay__instructions">
    If you've got no idea what the secret phrase is just keep saying the cue in different ways until the answer words appear... or you run out of time.
  </p>

<div className="howToPlay button__container">


  <Link className="button--home" 
    onClick={() => setShowHowToPlay(!showHowToPlay)}>
    Got it!
  </Link>

</div>

</div>
  )};

export default HowToPlay;
