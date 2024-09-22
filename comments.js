// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

// Connect to database
const db = require('./db');
const dbName = 'mydb';
const collectionName = 'comments';
const dbClient = db.initialize(dbName, collectionName);

// Get all comments
app.get('/api/comments', async (req, res) => {
  const comments = await dbClient.find();
  res.send(comments);
});

// Create a new comment
app.post('/api/comments', async (req, res) => {
  const comment = req.body;
  const result = await dbClient.create(comment);
  res.send(result);
});

// Update a comment by id
app.put('/api/comments/:id', async (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  const result = await dbClient.update(id, comment);
  res.send(result);
});

// Delete a comment by id
app.delete('/api/comments/:id', async (req, res) => {
  const id = req.params.id;
  const result = await dbClient.delete(id);
  res.send(result);
});

// Start web server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});