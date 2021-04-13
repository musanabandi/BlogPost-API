import express from "express";
import bodyParse from "body-parser";
import dotenv from 'dotenv';
import mongoose from 'mongoose'

import authRouter from './server/routes/AuthRoute';
import blogRouter from './server/routes/BlogRoute';
import commentRoute from './server/routes/commentRoute';


dotenv.config({path:'./.env'});

const app = express();


app.use(bodyParse.json());

app.use('/api/v1/blog',authRouter);
app.use('/api/v1/blog/dash',blogRouter);
app.use('/api/v1/blog/comment',commentRoute);

app.use('/',(req,res)=>{

   
    res.status(200).send({
        statu:200,
        message:"blog routes not exist"
    })
})

const databaseUrl= process.env.DATABASE;

mongoose.connect(databaseUrl,{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true, useFindAndModify:false}).then(()=>console.log("DB Connected Succefully"))

const port = process.env.PORT;
app.listen(port, ()=>{

console.log(`Server Is Running On Port ${port}`);

})

export default app;