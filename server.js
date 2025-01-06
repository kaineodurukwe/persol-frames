const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors middleware

const app = express();
app.get("/", (req, res) => res.send("Express server is running"));

app.use(cors()); // Enable CORS for all routes

// Path to the file where the count is stored
const countFilePath = path.join(__dirname, 'count.txt');

// Helper functions
function readCount() {
    try {
        const count = fs.readFileSync(countFilePath, 'utf8');
        return parseInt(count, 10) || 0;
    } catch (error) {
        return 0;
    }
}

function writeCount(count) {
    fs.writeFileSync(countFilePath, count.toString(), 'utf8');
}

// API endpoint
app.get('/api/visitor-count', (req, res) => {
    let count = readCount();
    count += 1;
    writeCount(count);
    res.json({ count });
});

// Define the port here, or use an environment variable
const PORT = process.env.PORT || 3000;  // Default to 3000 if no environment variable is set

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
