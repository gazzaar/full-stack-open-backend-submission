const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://full-stack-open:${password}@cluster0.su9ms.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model('Phonebook', noteSchema);

if (process.argv.length === 3) {
  Phonebook.find({}).then((results) => {
    console.log(results);
    mongoose.connection.close();
  });
} else {
  const person = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${result.name} ${result.number} to Phonebook`);
    mongoose.connection.close();
  });
}
