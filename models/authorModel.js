var mongoose = require('mongoose');

var authorSchema=new mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        address: {
            type:String,
            required:true
        },
        mobile: {
            type:Number,
            required:true
        },
        emailId: {
            type:String,
            required:true
        }
    }
)

var authorModel=mongoose.model('authors',authorSchema);

module.exports={authorModel}