const express=require('express');

const app=express();

const mongoose=require('mongoose')

const User=require('./Model/PostSchema')

const bodyParser=require('body-parser');

const jsonParser=bodyParser.json();

app.use(express.json());



const cors=require('cors');

const PostRoutes=require("./routes/PostRoutes")

mongoose.connect('mongodb+srv://Ironman:OrgoSxAUlgqz0o2H@cluster0.7n7uo.mongodb.net/sangammyFirstDatabase?retryWrites=true&w=majority',{
    

    useNewUrlParser: true,
    useUnifiedTopology: true,


}).then(()=>{
    console.log("mongodb is connected");
})
.catch(()=>{
    console.log("not connect")
})





//   Routes

app.use(cors());



app.use("/posts",PostRoutes);


//   Taking data  



// Registration form


// Login API



app.listen(4000)