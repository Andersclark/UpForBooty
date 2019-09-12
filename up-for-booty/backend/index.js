const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express();
app.use(express.json());
const uri = 'mongodb+srv://anders:SUDEUI3HWiQPuy62@bootycluster-iu6xq.mongodb.net/test?retryWrites=true'

mongoose.connect(uri);
global.connection = mongoose.connection;
connection.on('error', () => console.log('Could not connect to DB'));
connection.once('open', () => {
    console.log('Connected to DB')
});

app.listen(5000, () => {
  console.log(' Server is running on port: 5000');
});

