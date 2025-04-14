const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages, unlockedWalter } = req.body;

  const systemPrompt = unlockedWalter
    ? "You're Walter White. Respond intelligently, precisely, and with gravitas."
    : "You're Jesse Pinkman. Be casual, streetwise, and a little chaotic. Never repeat the user's message.";

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Jesse/Walter." });
  }
});

app.listen(PORT, () => {
  console.log(`Yo, Jesse app running at http://localhost:${PORT}`);
});
