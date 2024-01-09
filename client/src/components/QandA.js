import React from "react";

import AnswerBox from "./AnswerBox";

const QandA = ({ quiz, setQuiz, setFeedback }) => {
    function checkAnswer(number) {
        console.log("Checking answer: " + number);
        // setFeedback(" " * number)
        if (quiz.active) {
            const updatedQuiz = { ...quiz };

            if (number === updatedQuiz.correct_answer) {
                updatedQuiz.answers[number - 1].status = "correct";
                updatedQuiz.answers.forEach((ans, index) => {
                    if (ans.status === "pending" && index !== number - 1) {
                        ans.status = "disabled";
                    }
                });
                updatedQuiz.active = false;
            } else {
                updatedQuiz.answers[number - 1].status = "incorrect";
            }
            setQuiz(updatedQuiz);
        }
    }

    return (
        <div className="question-box">
            {quiz.question && (
                <div className="question-container">{quiz.question}</div>
            )}
            {quiz.answers[0].answer && (
                <div className="answer-container">
                    {quiz.answers.map(({ answer, value, status }, i) => (
                        <AnswerBox
                            text={answer}
                            status={status}
                            key={i}
                            number={value}
                            onSelect={checkAnswer}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default QandA;
