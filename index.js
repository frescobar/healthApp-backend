const express = require("express");
const  {dbConnection} = require("./database/config")
const cors = require("cors")
const app = express();

require('dotenv').config()

//cors
app.use(cors())
dbConnection();
//rutas
app.get("/", (req,res)=>{
    res.json({ok:true, msg: "prueba"})
})

const port = process.env.PORT

app.listen(port, ()=>console.log("running on port "+ port))