var express = require('express')
var bodyParser = require('body-parser')
var mongoose=require('mongoose')
var { authorModel } = require('../models/authorModel')
var { bookModel }=require('../models/bookModel')
var libraryRouter=express.Router()

libraryRouter.use(bodyParser.urlencoded({ extended: false }))
libraryRouter.use(bodyParser.json())

libraryRouter.get('/',(req,res)=>{
    return res.send("This is Authors page")
})

libraryRouter.post('/addbooks',(req,res)=>{   
    var bookObject=new bookModel(req.body);
    bookObject.save(
        (error)=>{
            if(error){
                res.send(error)
            } else {
                res.json({"status":"success"})

            }
        }
    )
    res.json( bookObject )
})


libraryRouter.get('/viewall', (req,res)=>{
    try{
        authorModel.aggregate(
            [
                {
                    $lookup:{
                        from:"books",
                        localField:"_id",
                        foreignField:"authorId",
                        as:"library"
                    }
                }
            ], (error,data)=>{
                return res.json(data)
            }
        )
       
    }catch(error){
        res.send(error)
    }
})

libraryRouter.post('/addauthor',(req,res)=>{   
    var authorObject=new authorModel(req.body);
    authorObject.save(
        (error)=>{
            if(error){
                res.send(error)
            } else {
                res.json({"status":"success"})

            }
        }
    )
    res.json( authorObject )
})

libraryRouter.get('/viewauthor',async (req,res)=>{
    try{
        var result=await authorModel.find()
        res.json(result)
    }catch(error){
        res.send(error)
    }
})
libraryRouter.post('/searchstudents',async(req,res)=>{
    try{
        var result=await authorModel.find(req.body)
        res.json(result)
    }catch(error){
        res.json({"status":"error"})
    }
})
libraryRouter.post('/editstudents',async(req,res)=>{
    try{
        var result=await authorModel.findOneAndUpdate({"_id":req.body._id},req.body)
        res.json(result)
    }catch(error){
        res.json({"status":"error"})
    }
})

libraryRouter.post('/deletestudents',async(req,res)=>{
    try{
        var result=await authorModel.findByIdAndDelete({"_id":req.body._id})
        res.json(result)
    }catch(error){
        res.json({"status":"error"})
    }
})


module.exports={libraryRouter}