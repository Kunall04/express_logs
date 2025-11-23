const express = require('express');
const { usermodel, todomodel } = require('./db.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "nigga leave me alone";
const app = express();
const mongoose=require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONN);

app.use(express.json());

app.post('/signup', async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        await usermodel.insertMany({
            name,
            email,
            password
        });

        res.json({ message: "signed up" });
    } catch (error) {
        res.status(400).json({ message: "Error signing up", error: error.message });
    }
});

app.post('/signin', async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await usermodel.findOne({ email, password });

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

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await todomodel.find({
        userId
    });

    res.json({
        todos 
    });
});

function auth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.token;
    if (!authHeader) {
        return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const decodeData = jwt.verify(token, JWT_SECRET);
        req.userId = decodeData.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

app.listen(3007);