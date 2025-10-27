const express = require("express");
const app = express();

//middleware to log some parameters

function logger(req,res,next) {
    console.log(`${req.method} ${req.url} ${new Date()}`);
    next();
}

app.use(logger);


app.get("/add", function(req,res) {
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);

    res.json({
        ans: a+b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);