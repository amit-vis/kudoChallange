const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/database')
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'))
app.listen(port, (err)=>{
    if(err){
        console.error("error in listening the server", err)
    }
    console.log("server is listening the port", port)
})