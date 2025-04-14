const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  const model = "gpt-3.5-turbo";  // You can also use gpt-4 if you want

  try {
    // Make a request to OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages: [{
        role: "user",
        content: userMessage
      }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Send the response from OpenAI back to the frontend
    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API request:', error);
    res.status(500).json({ error: 'Something went wrong with the AI request.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
