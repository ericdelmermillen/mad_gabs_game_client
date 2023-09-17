import "./HowToPlay.scss"

const HowToPlay = ({ setShowHowToPlay, showHowToPlay }) => {
  
  return (

  <div className="howToPlay">

    <div className="howToPlay__container">

    <h1 className="howToPlay__heading">How To Play</h1>

      <div className="howToPlay__content">
        <p className="howToPlay__instructions">
          To win, speak clearly so the microphone can detect the secret words.
        </p>
        <p className="howToPlay__instructions">
          If you're stuck, try different ways of saying the phrase until the answer is revealed or time runs out.
        </p>
      </div>


      <div className="howToPlay button__container">

        <span className="button--home" 
          onClick={() => setShowHowToPlay(!showHowToPlay)}>
          Got it!
        </span>

      </div>

    </div>

  </div>

)};

export default HowToPlay;
