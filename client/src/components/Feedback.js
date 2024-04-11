import React, { useState, useEffect } from "react";

const Feedback = ({ feedback }) => {
    const [question, setQuestion] = useState('');

    useEffect(() => {
        // Fetch the question from the server
        fetch('http://127.0.0.1:5000/api/getQuestion1',
        {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                // Set the question state to the question from the server
                if(data) {
                    setQuestion(data);
                } else {
                    console.error('Question not found');
                }
            })
            .catch(error => console.error('Error fetching question:', error));
    }, []);

    return (
        <div>
            <p>Question 1: {question}</p>
        </div>
    );
};

export default Feedback;
