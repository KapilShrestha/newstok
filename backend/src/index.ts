import express from 'express';
import config from './config';
import routes from './routes';
import {logger} from './middleware/logger';
const cors = require('cors');

const app = express();

//To ger req.body in json format
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);

app.use(routes)



app.listen(config.serverPort);