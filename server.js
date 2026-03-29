require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { messages, system } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL = 'gemini-2.0-flash';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const contents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
    }));

    contents[0].parts[0].text = system + '\n\n' + contents[0].parts[0].text;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
        });
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';
        res.json({ content: [{ text }] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Gemini' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));