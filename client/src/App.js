import React from "react";
import "./App.css";

import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="main">
                <Quiz />
            </div>
        </div>
    );
}

export default App;
