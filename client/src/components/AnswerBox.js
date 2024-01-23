import React from "react";

const AnswerBox = ({ text, status, number, onSelect }) => {
    return (
        <button onClick={() => onSelect(number)} className={`answer ${status}`}>
            {text}
            {/* Yessir */}
        </button>
    );
};

export default AnswerBox;
