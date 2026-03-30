require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { messages, system } = req.body;
    const API_KEY = process.env.GROQ_API_KEY;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_KEY
            },
            body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: system },
                    ...messages
                ],
                max_tokens: 800
            })
        });
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || 'Sorry, no response.';
        res.json({ content: [{ text }] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Groq' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));