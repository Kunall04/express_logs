const express=require('express');
const app=express();
const axios=require('axios');

app.use(express.json()); //helps you parse the req's body.

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

    res.send({
        message: "signed up"
    })
})

app.post("/signin", function(req,res) {
    const username=req.body.username;
    const password=req.body.password;

    const user=users.find(u=> u.username===username && u.password===password);

    if(user){
        let token=generateToken();
        user.token=token;
        res.json({
            token
        })
        console.log(users);
    }
    else 
        res.status(403).send({
            message: "invalid"
    })
});

app.listen(3001);