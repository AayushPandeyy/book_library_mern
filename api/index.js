import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './database/connection';

dotenv.config();

connection();


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});