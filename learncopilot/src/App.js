import React, { useState } from "react";
import Anthropic from "@anthropic-ai/sdk";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [messages, setMessages] = useState([]); // Initialize messages state

  // Assuming the apiKey is set in your environment variables as REACT_APP_ANTHROPIC_API_KEY
  const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        setIsFileUploaded(true);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = {
      id: messages.length + 1,
      text: currentInput,
      sender: "user",
    };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch(
        "http://localhost:5002/chat?requestMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: currentInput }),
        }
      );

      const msg = await response.json();

      if (msg && msg.responses && msg.responses.length > 0) {
        const responseText = msg.responses[0].content;
        const botMessage = {
          id: messages.length + 2,
          text: responseText,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error interacting with Claude:", error);
    }

    setCurrentInput("");
  };

  return (
    <div className="App">
      {!isFileUploaded ? (
        <div className="flex h-screen justify-center items-center flex-col">
          <h1 className="text-3xl font-bold text-center mb-4">
            Deeply understand what you read with ReadingCopilot!
          </h1>
          <label className="btn btn-primary cursor-pointer">
            Upload TXT file
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="flex h-screen">
          <div className="flex flex-col w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">
              Uploaded File Content:
            </h2>
            <textarea
              className="textarea textarea-bordered h-full"
              value={fileContent}
              readOnly
            ></textarea>
          </div>
          <div className="w-1/2 p-4 flex flex-col">
            {/* Chatbot-like interface */}
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4">Chatbot</h2>
              <div className="flex-grow overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-2 ${
                      message.sender === "bot" ? "text-left" : "text-right"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Your answer..."
                  className="input input-bordered w-full mb-4"
                />
                <button className="btn btn-primary" type="submit">
                  Submit Answer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
