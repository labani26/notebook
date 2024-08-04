const connectToMongo = require('./db');

// const useRouter = require('./routes/auth.js');

connectToMongo();

const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors')


app.use(cors())


app.use(express.json())

//Available Routes
app.use('/auth', require('./routes/auth.js'));
app.use('/note', require('./routes/note'));

app.listen(port, () => {
  console.log(`Notebook backend listening at http://localhost:${port}`)
})