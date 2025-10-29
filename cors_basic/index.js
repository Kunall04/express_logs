const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors());

app.use(express.static(__dirname + "/public"));

app.use(express.json());

// app.get("/", function(req,res) {
//     res.sendFile(__dirname + "/public/index.html");
// });

app.post("/add", (req,res) => {
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);

    res.json({
        ans: a+b
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});