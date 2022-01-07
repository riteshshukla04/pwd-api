const router=require('express').Router();
const Complaint=require('../model/complaints');
var bodyParser = require('body-parser');
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



const {ComplaintValidator}=require('../Validators/validation');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { response } = require('express');
const { json } = require('body-parser');
const verify=require('../Validators/token-validator');

var jsonParser = bodyParser.json()


router.post('/add',jsonParser,verify,async(req,res)=>{
    const {error}=ComplaintValidator(req.body);
    if (error){
        
        return res.status(400).send(error.details[0].message);
        
    }
    const complaint = new Complaint({
         cid:req.body.cid,
         name:req.body.name,
         phone:req.body.phone,
         pincode:req.body.pincode,
         complaint:req.body.Complaint,
         address:req.body.address
    })
    try{
        const Savedcomplaint=await complaint.save();
        res.send(Savedcomplaint);
    }catch (err){
        res.status(400).send(err);
    }
})




router.get('/getallcomplaint',jsonParser,verify,async(req,res)=>{
    try{
        const complaint=await Complaint.find({})
        res.status(200).send((complaint));

    }
    catch(err){
        res.status(400).send(err);
    }


})


router.put('/updatecomplaint/:id',jsonParser,urlencodedParser,verify,async(req,res)=>{
    try{
        const complaint=await Complaint.findByIdAndUpdate({_id:req.params.id},req.body)
    
        res.status(200).send(complaint);
       
    }
    catch(err){
        res.status(400).send(err);
    }
})



router.delete('/deletecomplaint/:id',jsonParser,urlencodedParser,verify,async(req,res)=>{
    try{
        const complain=await Complaint.findByIdAndDelete({_id:req.params.id})
     
        
        res.status(200).send(complain);
       
    }
    catch(err){
        res.status(400).send(err);
    }
})





module.exports=router;