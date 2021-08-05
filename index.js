const express = require("express");
const  {dbConnection} = require("./database/config")
const cors = require("cors")
const app = express();

require('dotenv').config()

//cors
app.use(cors())

//json middleware
app.use(express.json())

//DB connection
dbConnection();

//Directorio público

app.use(express.static("public"));


//rutas
 app.use("/api/usuarios", require("./routes/users"));
 app.use("/api/login", require("./routes/auth"));
 app.use("/api/hospitales", require("./routes/hospitales"));
 app.use("/api/doctores", require("./routes/doctor"));
 app.use("/api/todo", require("./routes/busqueda"));
 app.use("/api/upload", require("./routes/uploads"));



const port = process.env.PORT

app.listen(port, ()=>console.log("running on port "+ port))



