const express = require('express');
const app = express();
const port = 1234;
const cors = require('cors');

const moveRoute = require('./routes/move');

app.use(cors());
app.use(express.json());

app.use('/move', moveRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
