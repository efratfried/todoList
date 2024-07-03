const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let todos = [
  { id: 1, title: 'First Todo', description: 'This is the first todo', completed: false },
  { id: 2, title: 'Second Todo', description: 'This is the second todo', completed: true }
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  todos = todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo);
  res.status(200).json(updatedTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(200).json({ message: 'Todo deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
