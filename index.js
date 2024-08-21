const express = require('express');
let persons = require('./persons');
const app = express();

const route = '/api/persons/';

app.get(route, (req, res) => {
  res.json(persons);
});

app.get(`${route}:id`, (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`app starts at port${PORT} have fun!`);
});
