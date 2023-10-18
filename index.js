const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const PORT = process.env.RUNNING_PORT;
app.listen(PORT, ()=>{
    console.log("App Successfully running at port"+PORT);
});