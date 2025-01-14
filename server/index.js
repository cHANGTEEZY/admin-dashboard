import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import propertiesRoute from './routes/properties.js';
import clientsRoute from './routes/clients.js'
import transactionsRoute from './routes/transactions.js'


// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.use("/properties", propertiesRoute);
app.use("/clients", clientsRoute)
app.use("/transactions", transactionsRoute)



app.listen(3100, console.log("server started"));
