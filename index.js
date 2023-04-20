import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import { WebSocketServer } from 'ws';
import dataHandler from "./dataPersistance/dataHandler.js";
import * as fs from "fs";

const app = express()
const port = process.env.port

const wss = new WebSocketServer({ port: 8080 });

const recording = []

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        const poseJson = JSON.parse(data)
        recording.push(poseJson)
    });
});

app.use(cors())

app.use(bodyParser.json())

app.post("/pose", async (req, res) => {
    const { body } = req
    const result = await dataHandler.addPose(body)
    if(result) {
        res.send({error: null})
        return
    }
    res.status(502).send({error: "Something went wrong"})
})

app.post("/login", async (req, res) => {
    const { body } = req
    const result = await dataHandler.getUser(body)
    if(result) {
        res.send({error: null})
        return
    }
    res.status(401).send({error: "Wrong Email or Password"})
})


app.post("/register", async (req, res) => {
    const { body } = req
    await dataHandler.addUser(body)
    res.send({error: null})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})