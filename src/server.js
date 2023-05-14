require('dotenv').config()
const port = process.env.port
const app = require('./app')
const { connectDB, disconnectDB } = require('./database');

connectDB();

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
function shutDown() {
    server.close((err) => {
        disconnectDB()
        console.log('server closed')
        process.exit(err ? 1 : 0)
    })
}