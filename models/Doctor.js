const {Schema,model} = require("mongoose");


const doctorSchema = Schema({
    nombre:{
       type:String,
       required:true 
    },
    img:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref: "Hospital"
    },
}, {collection: "doctores"});

doctorSchema.method("toJSON", function(){
    const {__v, ...object}= this.toObject()
    return object;
})

module.exports = model("Doctor", doctorSchema)