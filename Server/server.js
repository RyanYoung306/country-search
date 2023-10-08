const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URI).then(() => 
  console.log('MongoDB connected...'))
.catch(err => console.log(err));

const countrySchema = new mongoose.Schema({
  id: Object,
  name: String,
  details: {
    capital: String,
    population: Number,
    currency: String,
    continent: String,
    language: String,
    },
  flag: String,
});
const Country = mongoose.model('Countries', countrySchema);

const json = require('./data.json');

app.get(`/workHuman/Countries/`, async (req, res) => {
  try{
    const data = await Country.find();
    res.send(data);
  }
  catch(err){
    res.send(err);
  }
});

app.use(bodyParser.json());
// POST route to add a new country
app.post('/add-json-to-db', async (req, res) => {
  try {
    // Read the JSON data from the file
    const jsonData = fs.readFileSync('data.json', 'utf8');
    const jsonParsed = JSON.parse(jsonData);

    // Insert the JSON data into the database
    await Country.insertMany(jsonParsed);

    res.status(201).json({ message: 'JSON data added to the database' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DON'T NOT USE THIS IN FULL PRODUCTION
// app.delete('/delete-all-data', async (req, res) => {
//   try {
//     await Country.deleteMany({});

//     res.status(200).json({ message: 'All data deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.listen(process.env.PORT, () => console.log('Example app is listening on port 3000.'));
