import React from "react";

import AnswerBox from "./AnswerBox";

const QandA = ({ quiz, setQuiz, setFeedback }) => {
    
    function checkAnswer(number) {
        setFeedback(" " * number)
        if (quiz.active) {
            if (number === quiz.correct_answer) {
                quiz.answers[number-1].status = "correct";
                quiz.answers.forEach(ans => {
                    if (ans.status === "pending") {
                        ans.status = "disabled";
                    }
                });
                quiz.active = false;
                setQuiz(quiz);
            } else if (number !== quiz.correct_answer) {
                quiz.answers[number-1].status = "incorrect";
                setQuiz(quiz);
            }
        }
        // setQuiz(quiz);
    }

    return (
        <div className="question-box">
            {quiz.question && 
                <div className="question-container">
                    {quiz.question}
                </div>
            }
            { quiz.answers[0].answer &&
                <div className="answer-container">
                    {quiz.answers.map(({ answer, value, status }, i) => (
                        <AnswerBox text={answer} status={status} key={i} number={value} onSelect={checkAnswer} />
                    ))}
                </div>
            }
        </div>
    );
};

export default QandA;
