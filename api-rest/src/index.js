const express = require('express');
const logRouter = require('./middleware/logMiddleware');

const routes = require('./Routes/router');

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(logRouter);

app.use('/projects', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} :)`);
});
