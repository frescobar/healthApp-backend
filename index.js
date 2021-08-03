const express = require("express");
const  {dbConnection} = require("./database/config")
const cors = require("cors")
const app = express();

require('dotenv').config()

//cors
app.use(cors())

app.use(express.json())


dbConnection();


//rutas
 app.use("/api/usuarios", require("./routes/users"))
 app.use("/api/login", require("./routes/auth"))



const port = process.env.PORT

app.listen(port, ()=>console.log("running on port "+ port))