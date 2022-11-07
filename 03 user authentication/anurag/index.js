const app = require("./app")

const {PORT} = process.env //destructuring
// same as process.env.PORT

app.listen(PORT, ()=>{"server is running"})     // we never mention portno like this for that we have .env file