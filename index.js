import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import * as dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const app = express()
const port = process.env.port

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/image', (req, res) => {
    const img = req.body.image.split(';base64,').pop();
    fs.writeFile('image.png', img, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})