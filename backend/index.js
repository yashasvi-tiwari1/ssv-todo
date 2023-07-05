const {json} = require('express')
const {todoRouter} =  require("./router/route");
const mongoose = require ("mongoose");
const cors = require('cors')
const express = require('express');


const app = express();
let PORT = 5000;
app.use(cors());
app.use(json());
app.use(todoRouter)
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost:27017/ToDoList',
    ()=>{
        console.log('database connected');
    })



app.listen(PORT, () => {
    console.log(`server is listening in http://localhost:${PORT}`)
})