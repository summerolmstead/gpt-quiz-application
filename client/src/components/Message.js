import React, { useState } from "react";

const Message = () => {
    const [message, setMessage] = useState("");
    const [resp, setResp] = useState("");

    async function getResult(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: message }),
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
        <>
            <form onSubmit={getResult}>
                <textarea
                    className="chatbox"
                    type="text"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                ></textarea>
                <button className="submit-button" type="submit">Submit</button>
            </form>
            <div className="respbox">{resp && (
                <div>
                    <p>Response:</p>
                    <p>{resp}</p>
                </div>
            )}</div>
        </>
    );
};

export default Message;
