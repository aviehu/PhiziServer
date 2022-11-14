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

function writeFile(img) {
    return new Promise((resolve) => {
        fs.writeFile('skeleton-py/pose.png', img, {encoding: 'base64'}, function(err) {
            resolve()
        })
    })
}

function getSkeleton() {
    return new Promise((resolve) => {
        const process = spawn('python',["skeleton-py/skeleton.py"])
        process.stdout.on('data',function(data) {
            const ans = JSON.parse(data.toString())
            resolve(ans)
        })
    })
}

app.post('/image', async (req, res) => {
    const img = req.body.image.split(';base64,').pop();
    await writeFile(img)
    const ans = await getSkeleton()
    res.json(JSON.stringify(ans))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})