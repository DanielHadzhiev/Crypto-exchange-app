import React, { useEffect, useState } from "react";
import { fetchHelloMessage } from "../services/api";

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getMessage = async () => {
            const response = await fetchHelloMessage();
            setMessage(response);
        };

        getMessage();
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default App;
