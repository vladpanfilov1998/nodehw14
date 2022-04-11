import express from 'express';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import fileUpload from 'express-fileupload';

import {config} from './config';
import {apiRouter} from './router';
import {cronRun} from './cron';

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(apiRouter);

const {PORT} = config;

app.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
            cronRun();
        }
    } catch (e: any) {
        console.log(e.message);
    }
});