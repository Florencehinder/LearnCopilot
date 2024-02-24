import React, { useState } from "react";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);

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

  return (
    <div className="App">
      {!isFileUploaded ? (
        <div className="flex h-screen justify-center items-center flex-col">
          <h1 className="text-3xl font-bold text-center mb-4">
            Generate Quizzes based on your course notes!
          </h1>
          <label className="btn btn-primary cursor-pointer">
            Upload Txt file
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        // Flex container for the entire screen
        <div className="flex h-screen">
          <div className="flex flex-col w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">
              Automate the Boring Stuff
            </h2>
            <textarea
              className="textarea textarea-bordered h-full"
              value={fileContent}
              readOnly
            ></textarea>
          </div>
          <div className="w-1/2 p-4">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Question</h2>
              <p className="mb-2">
                Here is an example question testing basic math operators in
                Python: <br></br> Input: x = 5 y = 3 <br></br> Output: 8{" "}
                <br></br>The goal is to write code that uses x and y to output
                the result of 5 + 3.{" "}
              </p>
              <input
                type="text"
                placeholder="Your answer..."
                className="input input-bordered w-full mb-4"
              />
              <button className="btn btn-primary">Submit Answer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
