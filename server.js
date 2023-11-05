// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body.task;
  tasks.push({ task, completed: false });
  console.log(tasks);
  res.send('Task added successfully!');
});

app.post('/tasks/complete', (req, res) => {
  const index = req.body.index;
  if (index !== undefined && index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    res.send('Task marked as completed!');
  } else {
    res.status(400).send('Invalid index');
  }
});

app.delete('/tasks', (req, res) => {
  const index = req.body.index;
  if (index !== undefined && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.send('Task deleted successfully!');
  } else {
    res.status(400).send('Invalid index');
  }
});

app.delete('/tasks/completed', (req, res) => {
  tasks = tasks.filter(task => !task.completed);
  res.send('Completed tasks deleted successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
