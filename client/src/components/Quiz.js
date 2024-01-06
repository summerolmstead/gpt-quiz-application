import React, { useState } from "react";

import Topic from "./Topic";
import QandA from "./QandA";
import Feedback from "./Feedback";

const Quiz = () => {
    const [topic, setTopic] = useState("");
    const [prevQ, setPrevQ] = useState([]);
    const [quiz, setQuiz] = useState({
        active: false,
        question: null,
        answers: [
            { answer: null, value: 1, status: "pending" },
            { answer: null, value: 2, status: "pending" },
            { answer: null, value: 3, status: "pending" },
            { answer: null, value: 4, status: "pending" },
        ],
        correct_answer: null,
    });
    const [feedback, setFeedback] = useState("");
    
    return (
        <div>
            <Topic topic={topic} setTopic={setTopic} setQuiz={setQuiz} setFeedback={setFeedback} prevQ={prevQ} setPrevQ={setPrevQ} />
            <QandA quiz={quiz} setQuiz={setQuiz} setFeedback={setFeedback} />
            <Feedback feedback={feedback} />
        </div>
    );
}

export default Quiz;