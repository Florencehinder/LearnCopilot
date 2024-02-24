const express = require("express");
const bodyParser = require("body-parser");
const Anthropic = require("@anthropic-ai/sdk");
const spacetrim = require("spacetrim").default;

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
  console.log("/generate-message");
  try {
    const { content } = req.body;
    const msg = await anthropic.messages.create({
      model: "claude-2.1",
      max_tokens: 4000,
      temperature: 0.1,
      system: spacetrim(
        (block) => `
            You are an expert professor in programming and you are tutoring a student to deeply understand the course notes from the textbook - Automate the Boring Stuff with Python, 2nd Edition: Practical Programming for Total Beginners.
        `
      ),
      messages: [
        {
          role: "user",
          content: spacetrim(
            (block) => `


                Ask questions about the most important topics and ask increasing difficult questions if the answers are good, make the questions easier if they are struggling. 

                Before asking a question, please think through the course content step by step within <thinking></thinking> XML tags.
                
                Ask me questions about <chapter>1</chapter> to test my understanding of the content.
                
                Keep asking questions until you think the main concepts of the book are fully understood.
                
                Add any feedback in <feedback></feedback>
                Ask a question in <question></question>
                

            
            
            


                Ask the student questions about <chapter>1</chapter> to improve my understanding of the textbook, ask questions about the most important topics and ask increasing difficult questions if they answer them well, make the questions easier if they are struggling. 

                Before asking a question, please think through the course content step by step within <thinking></thinking> XML tags.

                Keep asking questions until you think the main concepts of the book are fully understood.

                Add any feedback in <feedback></feedback>
                Ask a question in <question>What is the topic of this text?</question>

                The user is responding to the question:
                <response>
                
                </response>

            `
          ),
        },
      ],
    });
    res.json(msg);
  } catch (error) {
    console.error("Error interacting with Anthropic API:", error);
    res.status(500).send("Internal Server Error");
  }
});

/*
// message being sent to the react front end
app.get("/chat-test", (req, res) => {
  const requestMessage = req.query["requestMessage"];
  res.status(200).json( `YOU HAVE SAID ${requestMessage}` );
});

// Example GET route
app.get("/chat", async (req, res) => {
  const requestMessage = req.query["requestMessage"];
  const responseMessage = await anthropic.messages.create({
    model: "claude-2.1",
    max_tokens: 4000,
    temperature: 0.1,
    system: spacetrim(
      (block) => `
          You are an expert professor in python and you are tutoring a student to deeply understand 
          the course notes from the textbook - Automate the Boring Stuff with Python, 2nd Edition: 
          Practical Programming for Total Beginners. 
          
          Ask the students questions to improve their understanding of the textbook, ask questions
          about the most important topics and ask increasing difficult questions if they answer them well, 
          make the questions easier if they are struggling. 

          Before asking a question, please think through the course content step by step within <thinking></thinking> XML tags.

          Ask me questions about <chapter>1</chapter> to test my understanding of the content.    

          Keep asking questions until you think the main concepts of <chapter>1</chapter> are fully understood.`
    ),
    messages: [
      {
        role: "user",
        content: spacetrim(
          (block) => `
            Add any feedback in <feedback></feedback>
            Ask a question in <question></question>
            ${block(requestMessage)}
        
        `
        ),
      },
    ],
  });

  console.log(responseMessage);

  res.status(200).json(responseMessage.content[0].text);
});

*/

app.get("/sendpdf", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.post("/chat", async (req, res) => {
  const { content } = req.body;
  // Process the request using `content`
  // Respond appropriately
  res.json({
    /* response object */
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
