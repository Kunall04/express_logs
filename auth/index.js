const express=require('express');
const app=express();
const axios=require('axios');

app.use(express.json()); //helps you parse the req's body.

let users=[];

app.post("/signup", function(req,res) {
    const username=req.body.username;
    const password=req.body.password;

    // if(users.find(u => u.username===username)) {
    //     res.json({
    //         message: "already signed in"
    //     })
    // }

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "signed up"
    })
})

app.post("/signin", function(req,res) {
    
})