import React, { useState, useEffect } from "react";

const Feedback = ({ feedback }) => {
    const [question, setQuestion] = useState('');

    useEffect(() => {
        // Fetch the question from the server
        fetch('http://localhost:5000/getQuestion1',
        {
            method: 'GET',
            credentials: 'include', // Include cookies for cross-origin requests
            headers: {
                'Content-Type': 'application/json'
                // Additional headers can go here as needed
            },
        })
            .then(response => response.json())
            .then(data => {
                // Set the question state to the question from the server
                if(data.question1) {
                    setQuestion(data.question1);
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
