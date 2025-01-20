const express = require('express');
const logger = require('morgan');
const app = express();

const port = process.env.PORT || '8900';
const categoryRouter = require('./routes/category');
const projectRouter = require('./routes/project');
const utilities = require('./utilities/utility');

app.use(express.json());
app.use(logger('dev'));
app.set('port', port); //Port to listen on
app.listen(port); //Start the server

app.use("/api/category", categoryRouter);
app.use("/api/project", projectRouter);


app.use((req, res) =>
    utilities.formatErrorResponse(res,400,
            "End point not recognised"));




module.exports = app;