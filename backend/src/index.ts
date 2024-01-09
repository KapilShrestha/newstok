import express from 'express';
import config from './config';
import routes from './routes';
import {logger} from './middleware/logger';

const app = express();

//To ger req.body in json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);

app.use(routes)

console.log(`Server listening on port:${config.serverPort}`);

app.listen(config.serverPort);