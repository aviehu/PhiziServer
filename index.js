import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import * as dotenv from 'dotenv'
import { WebSocketServer } from 'ws';
dotenv.config()

const app = express()
const port = process.env.port

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log(JSON.parse(data));
    });
});

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

var rightHandUp = false
var leftHandUp = false

function rightHandHandler(body) {
    for(let i=0; i< body.length;i++) {
        if(rightHandUp) {
            if(body[i].rightShoulder.y > body[i].rightElbow.y
                || body[i].rightShoulder.y > body[i].rightWrist.y) {
                rightHandUp = false
                console.log("Right hand down i:"+i)
            }
        }
        else {
            if(body[i].rightShoulder.y < body[i].rightElbow.y
                && body[i].rightShoulder.y < body[i].rightWrist.y) {
                rightHandUp = true
                console.log("Right hand up i:"+i)
            }
        }
    }
}

function leftHandHandler(body) {
    for(let i=0; i< body.length;i++) {
        if(leftHandUp) {
            if(body[i].leftShoulder.y > body[i].leftElbow.y
                || body[i].leftShoulder.y > body[i].leftWrist.y) {
                leftHandUp = false
                console.log("left hand down i:"+i)
            }
        }
        else {
            if(body[i].leftShoulder.y < body[i].leftElbow.y
                && body[i].leftShoulder.y < body[i].leftWrist.y) {
                leftHandUp = true
                console.log("left hand up i:"+i)
            }
        }
    }
}

app.post('/image', async (req, res) => {
    // console.log(req.body)
    // rightHandUp = false
    // leftHandUp = false
    // rightHandHandler(req.body)
    // leftHandHandler(req.body)
    res.json({leftHandUp, rightHandUp})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})