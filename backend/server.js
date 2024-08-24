const express = require('express');
const cors = require('cors');
const studentsRouter = require('./routes/students');
const mentorsRouter = require('./routes/mentors');
const bookingsRouter = require('./routes/bookings');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/students', studentsRouter);
app.use('/api/mentors', mentorsRouter);
app.use('/api/bookings', bookingsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});