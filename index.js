import express from 'express';
import {connection} from './postgres/postgres.js';
import router from './view/routes.js';
import cors from 'cors'
//methods to create a server and show which port it is running on
const app = express();
app.use(express.json())
app.use(router);
app.use(cors())
const PORT = 9019;
app.listen(PORT, () =>{
    console.log(`Server is running at PORT ${PORT}`)
});


connection();