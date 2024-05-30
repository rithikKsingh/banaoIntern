const express=require("express")
const connectDb=require("./config/db.js")
const userRoutes=require("./routes/userRoutes.js")
const cookieParser = require('cookie-parser')
const app=express()
const PORT=4000

connectDb();
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/api/user",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server listening on the port ${PORT}`)
})