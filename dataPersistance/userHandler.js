import { validate } from 'jsonschema'
const connectionUrl = process.env.MONGO_URL

const userSchema = {
    "type": "object",
    "properties": {
        "email": {"type": "string"},
        "password": {"type": "string"},
        "age": {"type": "number"},
        "height": {"type": "number"}
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
        console.log(result)
        return result
    }

    return UserHandler
}

