const express = require('express');
const { usermodel, todomodel } = require('./db.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "nigga leave me alone";
const app = express();
const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://admin:nqTRM9DmS50YZYDD@cluster0.d1zoolc.mongodb.net/23nov');

app.use(express.json());

app.post('/signup', async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        await usermodel.insertMany({
            name: name, 
            email: email,
            password: password
        });

        res.json({
            message: "signed up"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error signing up",
            error: error.message
        });
    }
});

app.post('/signin', async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await usermodel.findOne({
            email: email,
            password: password
        });

        if(user) {
            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET);
            
            res.json({
                token: token
            });
        }
        else {
            res.status(403).json({
                message: "invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error signing in",
            error: error.message
        });
    }
});

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await todomodel.create({
        userId,
        title,
        done,
    });

    res.json({
        message: "Todo created",
    });
});

app.get("/todo", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await todomodel.find({
        userId
    });

    res.json({
        todos
    });
});

function auth(req,res,next) {
    const token=req.headers.token;

    const decodeData=jwt.verify(token,JWT_SECRET);

    if(decodeData) {
        req.userId=decodeData.id;
        next();
    }
    else {
        res.status(401).json({
            message: "unauthenticated"
        });
    }
}

app.listen(3007);