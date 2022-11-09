import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import * as dotenv from 'dotenv'
import fs from 'fs'
import child_process from "child_process";
dotenv.config()

const spawn = child_process.spawn
const app = express()
const port = process.env.port

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/image', (req, res) => {
    const img = req.body.image.split(';base64,').pop();
    fs.writeFile('skeleton-py/pose.png', img, {encoding: 'base64'}, function(err) {
        console.log('File created');
        const process = spawn('python',["skeleton-py/skeleton.py"])
        process.stdout.on('data',function(data) {
            const ans = JSON.parse(data.toString())
            console.log(ans)
            res.json(JSON.stringify(ans))
        })
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})