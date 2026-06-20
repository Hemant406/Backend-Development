// const express = require('express');
import express from "express";

const app = express();
app.get('/',(req,res)=>{
    res.send('Home Page');
})
app.get('/about',(req,res)=>{
    res.send('About Page');
})
app.listen(3000,()=>{
    console.log("App started running");
});