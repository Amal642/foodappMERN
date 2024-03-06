// // const mongoDB = require("./db");
// const connectToMongo = require("./db");
// const express= require('express')
// const app=express()
// const port= 5000

// // mongoDB();
// connectToMongo();
// app.get('/',(req,res)=>{
//     res.send("Hello World");
// });
// app.use(express.json());
// app.use('/',require("./routes/CreateUser"));
// app.listen(port,()=>{
//     console.log(`working on http://localhost:${port}`);
// });

  
const connectToMongo = require("./db");
const express = require('express');
const app = express();
const port = 5000;

connectToMongo();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
