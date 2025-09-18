import React from 'react';
import '../Styles/Loader.css';

const Loader = () => {
  return (
    <div className="clean-loader-container">
      <div className="dots-loader">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loader;
