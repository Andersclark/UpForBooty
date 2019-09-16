const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const Person = require('./models/Booty');

const app = express();
app.use(express.json());

const uri = 'mongodb+srv://anders:SUDEUI3HWiQPuy62@bootycluster-iu6xq.mongodb.net/UpForBooty?retryWrites=true';
mongoose.connect(uri);
global.db = mongoose.connection;

db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
    console.log('Connected to DB');
});

const bootyRouter = require('./routes/booty');
app.use('/booty', bootyRouter);

app.listen(5000, () => {
  console.log(' Server is running on port: 5000');
});



