const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const Person = require('./models/Booty');
const dbReset = true;
const app = express();
app.use(express.json());

const uri = 'mongodb+srv://anders:SUDEUI3HWiQPuy62@bootycluster-iu6xq.mongodb.net/UpForBooty?retryWrites=true';
mongoose.connect(uri);
global.db = mongoose.connection;

db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');

  if (dbReset) {
    console.log('Cleaning DB...')
    Person.deleteMany({}, function (err) { });
    console.log('Batch-inserting mock-data...')
    const mockdata = require('./mockdata.json')
    Person.insertMany(mockdata);
    console.log('Database reset complete!')
  }
});

app.use('/public', express.static('./public'));

const bootyRouter = require('./routes/booty');
app.use('/booty', bootyRouter);

const googleRouter = require('./routes/googlemapsapi');
app.use('/place', googleRouter);

app.listen(5000, () => {
  console.log(' Server is running on port: 5000');
});