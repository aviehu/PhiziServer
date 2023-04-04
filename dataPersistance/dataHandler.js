import { MongoClient } from 'mongodb';
import userHandler from "./userHandler.js";

const connectionUrl = "mongodb+srv://aviehu:EBPnEb9tmKakmfTL@cluster0.2ucep3a.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(connectionUrl);
await client.connect();
const db = client.db('Cluster0');
const UserHandler = userHandler(db)

const dataHandler = {}

dataHandler.addUser = async function addUser(user) {
    return await UserHandler.addUser(user)
}

dataHandler.getUser = async function getUser(user) {
    return await UserHandler.getUser(user)
}

export default dataHandler
