const express = require('express');
let persons = require('./persons');
const app = express();

const route = '/api/persons/';

app.get(route, (_, res) => {
  res.json(persons);
});

app.get(`${route}:id`, (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  res.json(person);
});

// step 2
const entries = persons.length;

app.get('/api/info', (_, res) => {
  res.send(
    `<p> phonebook has info for ${entries} people <br> ${new Date()} </p>`,
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`app starts at port${PORT} have fun!`);
});
