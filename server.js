const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const authRoutes =require('./routes/authRoutes')
const newsRoutes = require('./routes/newsRoutes')

const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongo-db Connected");
})

app.use('/api/auth',authRoutes);

app.use('/api/news',newsRoutes)

    app.listen(5000,()=>{
    console.log("Server runnning sucessfully");
})
