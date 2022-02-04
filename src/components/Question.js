import React, {useState} from 'react'
import {decode} from 'html-entities';

const Question = ({id, question, selectedAnswer, complete}) => {
    const [chosenAnswer, setChosenAnswer] = useState('')   
        
    const answerElements = question.answers.map((answer, index) => {        
        const backgroundStyle = {
            backgroundColor: '',
            opacity: 1
        }
        
        if (answer === chosenAnswer && !complete ) {
            backgroundStyle.backgroundColor = '#D6DBF5'
        } else if (answer === question.correctAnswer && complete) {
            backgroundStyle.backgroundColor = '#94D7A2'
        } else if (answer === chosenAnswer && question.correctAnswer !== chosenAnswer && complete) {
            backgroundStyle.backgroundColor = '#F8BCBC'
            backgroundStyle.opacity = .5
        }
                
        return (
            <button key={index} className="answer-btn" style={backgroundStyle} onClick={() => storeAnswer(answer)}> {decode(answer)} </button>
        )
    })
    
    const storeAnswer = answer => {
        setChosenAnswer(answer)
        selectedAnswer(id, answer)
    }
            
    return (
        <div className="question">
            <h2>{decode(question.question)}</h2>
            {answerElements}
        </div>
    )
}

export default Question