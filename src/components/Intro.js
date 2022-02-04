import React from "react";
import topBlob from "../../public/imgs/top-blob.png";
import bottomBlob from "../../public/imgs/bottom-blob.png";

const Intro = ({ startQuiz }) => (
  <div className="intro-page">
    <img className="top-blob" src={topBlob} alt="top blob pic" />
    <h1 className="site-title"> Quizzical </h1>
    <p>Test your knowledge with a random 5 question quiz</p>
    <button className="start-btn" onClick={startQuiz}>
      Start quiz
    </button>
    <img className="bottom-blob" src={bottomBlob} alt="bottom blob" />
  </div>
);

export default Intro;
