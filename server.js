const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const coonectDb = require('./config/db');
const testRouter = require('./routes/testroute');
const fileupload = require('express-fileupload');
const path = require('path');


dotenv.config({ path: './config/config.env' });

coonectDb();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == 'devlopment') {
    app.use(morgan('dev'));
}
app.use(fileupload());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/V1/test', testRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => `Server running on port ${port} 🔥`);

//handele undifined promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    server.close(() => process.exit(1));
})