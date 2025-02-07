const mongoose= require("mongoose")
const  Schema  = mongoose.Schema;
const eventDetail = new Schema({
    title:{type:String, required:true},
    description:{type:String, required: true},
    imageUrl:{type:String, required:true},
    date:{type:Date, required:true},
    time:{type:String, required:true},
    location:{type:String, required:true},
    creator:{type:Schema.Types.ObjectId, ref: 'User'},
    createdOn: {type:Date, default:Date.now},

})
module.exports=mongoose.model("Event",eventDetail);