import React, { useState } from "react";

const Topic = ({ topic, setTopic, setResp }) => {

    async function getResult(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: topic }),
            });

            const result = await response.json();

            if (response.ok) {
                setResp(result.message);
            } else {
                setResp("Server error: " + result.message);
            }
        } catch (error) {
            setResp("Error submitting prompt: " + error);
        }
    }

    return (
        <div className="topic">
            <div className="topic-tag">Topic:</div>

            <form onSubmit={getResult}>
                <input
                    className="topic-box"
                    type="text"
                    onChange={(e) => {
                        setTopic(e.target.value);
                    }}
                ></input>
                <button className="submit-button" type="submit">&#10140;</button>
            </form>
        </div>
    );
};

export default Topic;
