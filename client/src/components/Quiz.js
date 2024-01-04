import React, { useState } from "react";

import Topic from "./Topic";
import QandA from "./QandA";

const Quiz = () => {
    const [topic, setTopic] = useState("");
    const [resp, setResp] = useState("Standard state");
    
    return (
        <div>
            <Topic topic={topic} setTopic={setTopic} setResp={setResp} />
            <QandA resp={resp} />
            {/* Submit and Refresh Buttons */}
        </div>
    );
}

export default Quiz