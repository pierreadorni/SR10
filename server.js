// express server for the app
import express from 'express';
import db from './database.js';

const app = express();
const port = 3000;


import {getOrganisations, insertOrganisation} from "./routes/organisations.js";

// use static
app.use('/documents', express.static('documents',));
app.get('/', getOrganisations)
app.post('/', insertOrganisation)
db.connect();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})