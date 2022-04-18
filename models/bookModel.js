var mongoose = require('mongoose');

var bookSchema=new mongoose.Schema(
    {
        authorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'authors'
        },
        name: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        category: {
            type:String,
            required:true
        },
        price: {
            type:Number,
            required:true
        }
    }
)

var bookModel=mongoose.model('books',bookSchema);

module.exports={bookModel}