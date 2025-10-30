const express=require('express');
const app=express();
// const axios=require('axios');

app.use(express.json()); //helps you parse the req's body.

const users=[];

function generateToken() {
  let options = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }

  return token;
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
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = generateToken();
        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

app.get("/me", function(req,res) {
    const token=req.headers.token;
    const user=users.find(u=> u.token===token);

    if(user) {
        res.send({
            username: user.username
        });
    }
    else {
        res.status(401).send({
            message: "invalid token/unauthorized"
        });
    }
});

app.listen(3006);