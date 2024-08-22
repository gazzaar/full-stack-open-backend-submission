const express = require('express');
let persons = require('./persons');
const app = express();
app.use(express.json());
const route = '/api/persons/';

app.get(route, (_, res) => {
  res.json(persons);
});

// step 3
app.get(`${route}:id`, (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// step 2
const entries = persons.length;

app.get('/api/info', (_, res) => {
  res.send(
    `<p> phonebook has info for ${entries} people <br> ${new Date()} </p>`,
  );
});

// step 4
app.delete(`${route}:id`, (req, res) => {
  const id = req.params.id;
  persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// step 5
app.post(route, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'missing person name and number',
    });
  }
  const duplicateName = persons.some((person) => person.name === body.name);
  if (duplicateName) {
    return res.status(400).json({
      error: 'person already exists',
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  };
  persons = [...persons, person];
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`app starts at port${PORT} have fun!`);
});
