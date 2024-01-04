import React from "react";
import "./App.css";

import Message from "./components/Message";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="main">
                <Message />
            </div>
        </div>
    );
}

export default App;
