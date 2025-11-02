const express=require('express');
const app=express();
// const axios=require('axios');
const jwt=require('jsonwebtoken');
const JWT_SECRET="forwhomthebelltolls";


app.use(express.json()); //helps you parse the req's body.

const users=[];

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
})

function auth(req,res,next) {
    const token=req.headers.token;
    try {
        const userInfo = jwt.verify(token, JWT_SECRET);
        if (userInfo.username) {
            req.username = userInfo.username;
            next();   //next
        } else {
            res.status(401).json({
                message: "you are not logged in"
            });
        }
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
}  

function logger(req,res,next) {
    console.log(req.method+" request came");
    next();
}

app.post("/signup", function(req,res) {
    const username=req.body.username;
    const password=req.body.password;

    // Validate input
    if(!username || !password) {
        return res.status(404).json({
            message: "username and password are required"
        });
    }

    // Check for duplicate username
    if(users.find(u => u.username===username)) {
        return res.status(404).json({
            message: "username already exists"
        });
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "signed up"
    });
    console.log(users);
});


app.post("/signin", (req, res) => {
    console.log("req came"+req.body);
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // const token = generateToken();
        const token=jwt.sign({
            username: username
        }, JWT_SECRET)

        // user.token=token;
        res.send({
            token: token
        })
        console.log(users);
    } 
    else {
        res.status(403).send({
            message: "Invalid username"
        })
    }
});

app.get("/me", logger, auth, function(req,res) {
    const user=users.find(u=> u.username===req.username);

    if(user) {
        res.send({
            username: user.username,
            password: user.password
        });
    }
    else {
        res.status(401).send({
            message: "unauthorized"
        });
    }
});

app.listen(3007, function() {
    console.log("server at 3007");
});
