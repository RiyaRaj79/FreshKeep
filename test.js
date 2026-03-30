require('dotenv').config();
const fetch = require('node-fetch');
const key = process.env.GROQ_API_KEY;

fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + key
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: 'hello' }],
    max_tokens: 100
  })
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2)));