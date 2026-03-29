require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { messages, system } = req.body;
    const API_KEY = process.env.ANTHROPIC_API_KEY;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 800,
                system: system,
                messages: messages
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Anthropic' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

3. In your `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
PORT=5000
```

4. Add `.env` to `.gitignore`:
```
.env
node_modules