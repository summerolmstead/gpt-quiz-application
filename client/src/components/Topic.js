import React, { useState } from "react";

const Topic = ({ topic, setTopic, setQuiz, setFeedback, prevQ, setPrevQ }) => {
    const [enabled, setEnabled] = useState(true);

    async function getResult(event) {
        event.preventDefault();

        if (!enabled) {
            return false;
        }

        setEnabled(false);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: topic, prev_questions: prevQ }),
            });

            const result = await response.json();

            if (response.ok) {
                var q = result.content;
                var quiz = {
                    active: true,
                    question: q.question,
                    answers: [
                        { answer: q.a1, value: 1, status: "pending" },
                        { answer: q.a2, value: 2, status: "pending" },
                        { answer: q.a3, value: 3, status: "pending" },
                        { answer: q.a4, value: 4, status: "pending" },
                    ],
                    correct_answer: q.correct_answer,
                };
                setQuiz(quiz);

                var newPrevQ = prevQ;
                newPrevQ.push(q.question);
                setPrevQ(newPrevQ);
            } else {
                alert("Server error: " + result.message);
            }
        } catch (error) {
            alert("Error submitting prompt: " + error);
        }

        setEnabled(true);
    }

    return (
        <div className="topic">
            {/* Make new section for past answer review */}
            <div className="topic-tag">Topic:</div>

            <form onSubmit={getResult}>
                <input
                    className="topic-box"
                    type="text"
                    onChange={(e) => {
                        setTopic(e.target.value);
                    }}
                ></input>
                <button
                    className={`form-button enter${enabled ? "" : " disabled"}`}
                    type="submit"
                >
                    &#10140;
                </button>
            </form>
        </div>
    );
};

export default Topic;
