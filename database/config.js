const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("connectado a la db");
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo conectar a la base de datos");
  }
};

module.exports = {
  dbConnection,
};
