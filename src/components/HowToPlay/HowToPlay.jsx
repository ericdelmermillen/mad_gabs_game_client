import "./HowToPlay.scss"

const HowToPlay = ({setShowHowToPlay, showHowToPlay}) => {

  console.log("from howToPlay: ", showHowToPlay)
  
  return (

  <div className="howToPlay">

    <div className="howToPlay__container">

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


        <span className="button--home" 
          onClick={() => setShowHowToPlay(!showHowToPlay)}>
          Got it!
        </span>

      </div>

    </div>

  </div>

)};

export default HowToPlay;
