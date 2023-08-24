import React from 'react';
import './Keyword.scss';
const Keyword = ({word,transcript}) => {
    console.log(transcript)

    console.log(transcript)
    if (!transcript||!transcript.includes(word)){
        return (
            <div className="not-word">
                {word}
            </div>
        )
    }

        
      

    return (
        <div className="word">
            {word}
        </div>
           
    );
};

export default Keyword;