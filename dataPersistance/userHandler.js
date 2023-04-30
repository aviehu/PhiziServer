import { validate } from 'jsonschema'
const connectionUrl = process.env.MONGO_URL

const userSchema = {
    "type": "object",
    "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" },
        "age": { "type": "number" },
        "weight": { "type": "number" },
        "height": { "type": "number" },
        "bmi": { "type": "float" },
        "goals": { "type": "array" }
    },
}

export default function userHandler(dataBase) {
    const users = dataBase.collection('Users');

    const UserHandler = {}

    UserHandler.addUser = async function (user) {
        await users.insertOne(user);
    }

    UserHandler.getUser = async function (user) {
        const result = await users.findOne(user)
        return result
    }

    UserHandler.getAllUser = async function () {
        console.log("userHandler")
        const result = await users.find().toArray();
        console.log(result);
        return result;


    }

    return UserHandler
}

