const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple Node.js server to run your website

const port = 3000;

const server = http.createServer((req, res) => {
    let filePath = '.' + (req.url === '/' ? '/index.html' : req.url);

    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});