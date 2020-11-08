const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/api');
app.use('/api/api', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.user(express.static(__dirname + '/public'));

  // Handle Single Page Application (SPA)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));