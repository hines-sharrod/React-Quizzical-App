import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import { nanoid } from "nanoid";

const App = () => {
  const [isQuiz, setIsQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isQuiz) {
      return;
    }

    setIsLoading(true);
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(
          data.results.map((q) => {
            const { question, incorrect_answers, correct_answer } = q;
            const answers = incorrect_answers.slice();

            const randomNum = (arr) => {
              return Math.floor(Math.random() * arr.length);
            };

            answers.splice(randomNum(incorrect_answers), 0, correct_answer);
            setIsLoading(false);

            return {
              id: nanoid(),
              question: question,
              answers: answers,
              correctAnswer: correct_answer,
              selectedAnswer: ""
            };
          })
        );
      });
  }, [isQuiz]);

  const startQuizHandler = () => {
    setIsQuiz(true);
  };

  const selectedAnswerHandler = (id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        return q.id === id ? { ...q, selectedAnswer: answer } : q;
      })
    );
  };

  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        question={question}
        selectedAnswer={selectedAnswerHandler}
        complete={complete}
      />
    );
  });

  const checkAnswers = () => {
    for (const question of questions) {
      if (question.correctAnswer === question.selectedAnswer) {
        setAnswerCount((prevCount) => prevCount + 1);
      }
    }

    setComplete(true);
  };

  const restartQuiz = () => {
    setIsQuiz(false);
    setComplete(false);
    setAnswerCount(0);
    setQuestions([]);
  };

  return (
    <main>
      {!isQuiz && <Intro startQuiz={startQuizHandler} />}

      {isQuiz && (
        <div className="quiz-page">
          {questionElements}
          {!complete && !isLoading && (
            <button className="check-answers-btn" onClick={checkAnswers}>
              Check Answers
            </button>
          )}
          {complete && (
            <p className="answer-count-container">
              You scored {answerCount} / 5 correct answers
              <button
                className="check-answers-btn play-again-btn"
                onClick={restartQuiz}
              >
                Play Again{" "}
              </button>
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default App;
