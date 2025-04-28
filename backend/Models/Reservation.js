
const mongoose=require('mongoose')

const ReserveSchema=new mongoose.Schema({
    tables:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    people:{type: Number, required :true},
    date:{type:String, required:true},
    time:{type:String,required:true},
    status:{type:String,default:'planned'},
    additional:String
})


const ReserveModel=mongoose.models.reserve||mongoose.model("Reservation", ReserveSchema)
module.exports=ReserveModel