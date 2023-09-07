import React from 'react';
import './Loading.scss';

function Loading() {
  return (
    <div className="loading">
      <div className="loading__circle"></div>
      <div className="loading__text">Loading...</div>
    </div>
  );
}

export default Loading;
