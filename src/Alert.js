import React from "react";
import "./Alert.css";

function Alert({ messages, type }) {
    return (
        <div className={type}>
            {messages.map(error => (
                <p key={error}>
                    {error}
                </p>
            ))}
        </div>
    );
}

export default Alert;
