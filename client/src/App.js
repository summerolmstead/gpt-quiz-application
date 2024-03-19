import React from "react";
import "./App.css";

import Header from "./components/Header";
import Quiz from "./components/Quiz";
import LoginForm from "./components/LoginForm";

function App() {
  // Handle login logic
  const handleLogin = (userData) => {
    // Your login logic goes here
    console.log("User logged in:", userData);
    // You can perform any additional actions needed upon login
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        {/*the LoginForm component */}
        <LoginForm onLogin={handleLogin} />

        {/*adding space */}
        <div style={{ marginBottom: "40px" }} />

        {/*the Quiz component unconditionally */}
        <Quiz />
      </div>
    </div>
  );
}

export default App;
