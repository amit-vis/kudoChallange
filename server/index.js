const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/database')
const app = express();
const port = 8000;

const allowedOrigins = [
    'http://localhost:3000', // Local Development
    'https://kudo-challange.vercel.app/', // Staging
    'https://kudochallange.onrender.com' // Production
];

app.use(bodyParser.json());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api', require('./routes/index'))
app.listen(port, (err)=>{
    if(err){
        console.error("error in listening the server", err)
    }
    console.log("server is listening the port", port)
})