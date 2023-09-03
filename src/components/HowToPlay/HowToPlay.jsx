import "./HowToPlay.scss"
import { Link } from 'react-router-dom';

const HowToPlay = ({setShowHowToPlay, showHowToPlay}) => {
  return (

<div className="howToPlay__card">

<h1 className="howToPlay__heading">How To Play</h1>


<div className="button__container">

  <Link className="button--home" 
    onClick={() => setShowHowToPlay(!showHowToPlay)}>
    Close
  </Link>

</div>

</div>
  )};

export default HowToPlay;
