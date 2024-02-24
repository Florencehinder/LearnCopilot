const express = require("express");
const bodyParser = require("body-parser");
const Anthropic = require("@anthropic-ai/sdk");
const spacetrim = require("spacetrim").default;
// import Anthropic from "@anthropic-ai/sdk";

console.log(spacetrim);

const cors = require("cors");
require("dotenv").config({ path: `.env.local` });

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
});
console.log(process.env.REACT_APP_ANTHROPIC_API_KEY);
app.post("/generate-message", async (req, res) => {
  try {
    const { content } = req.body;
    const msg = await anthropic.messages.create({
      model: "claude-2.1",
      max_tokens: 4000,
      temperature: 0.1,
      system: "Your system description here...",
      messages: [{ role: "user", content }],
    });
    res.json(msg);
  } catch (error) {
    console.error("Error interacting with Anthropic API:", error);
    res.status(500).send("Internal Server Error");
  }
});

// message being sent to the react front end
app.get("/test", (req, res) => {
  const requestMessage = req.query["requestMessage"];
  res.status(200).json({ responseMessage: `YOU HAVE SAYD ${requestMessage}` });
});

// Example GET route
app.get("/chat", async (req, res) => {
  const requestMessage = req.query["requestMessage"];
  const responseMessage = await anthropic.messages.create({
    model: "claude-2.1",
    max_tokens: 4000,
    temperature: 0.1,
    system:
      "You are an expert professor in python tutoring a student to deeply understand the course notes from the textbook - Automate the Boring Stuff with Python, 2nd Edition: Practical Programming for Total Beginners. Provide the students example questions to improve their programming based on the sections of the textbook.\nShow the question based on the chapter of the text book. ",
    messages: [
      {
        role: "user",
        content: spacetrim(
          (block) => `
        
            I gave you a textbook for python and some example questions about python please
            create questions relevant to the course content in
            
            <chapter>1</chapter>
            
            to test my understanding of the course content.
            
            
            Before creating example questions, please think about the question step by step within
            
            
            <thinking></thinking>
            
            XML tags, think step by step.
            
            
            Then create the question in
            
            <question></question>
            
            
            please include input values and output values. Similar to leetcode style

            The question from the user is

            ${block(requestMessage)}
      
        
        
        `
        ),
      },
    ],
  });

  console.log(responseMessage);

  res.status(200).json(responseMessage.content[0].text);
});

app.get("/sendpdf", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

// adding a post for the pdf to anthropic
//app.post();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
