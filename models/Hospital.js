const {Schema,model} = require("mongoose");


const HospitalSchema = Schema({
    nombre:{
       type:String,
       required:true 
    },
    img:{
        type:String,
    },
    //relacionar hospital con el usuario
    user: {
       
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
}, {collection: "hospitales"});

HospitalSchema.method("toJSON", function(){
    const {__v, ...object}= this.toObject()
    return object;
})

module.exports = model("Hospital", HospitalSchema)