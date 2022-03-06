const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const {createLogger,transports} = require('winston');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const haiku = require('./routes/haiku');
const users = require('./routes/users');

const { errorController } = require('./middleware/errorController');

const logger = createLogger({
    level:'info',
    transports: [
        new transports.Console({level:'error'}),
        new transports.Console({level:'info'})
    ],
    exceptionHandlers: [
        new transports.File({filename:'exceptions.log'})
    ],
    rejectionHandlers: [
        new transports.File({filename:'rejections.log'})
    ]
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));

app.use('/', haiku);
app.use('/', users);

app.use(errorController);

mongoose.connect(process.env.MONGODB_URL)
    .then(logger.info('Connected to MongoDB'))

const PORT = process.env.PORT;
app.listen(PORT,()=>logger.info('Listening to port ' + PORT));