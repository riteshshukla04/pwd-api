const router=require('express').Router();
const User=require('../model/user');
var bodyParser = require('body-parser');
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const {RegisterValidation} = require('../Validators/validation');


var jsonParser = bodyParser.json()




var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/register',jsonParser,async (req,res)=>{
    const {error}=RegisterValidation(req.body);
    if (error){
        
        return res.status(400).send(error.details[0].message);
        
    }
    
   const resp=await User.exists({email:req.body.email});
    if(resp){
        console.log(resp)
        return res.status(400).send("Already Exists");
    }
    try{
    const salt=await bycrypt.genSalt(10);
    const hashedPassword=await bycrypt.hash(req.body.password,salt);
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    
        const savedUser=await user.save();
        res.send(savedUser);
    }catch (err){
        res.status(400).send(err);
    }
    
});



router.post('/login',jsonParser,async (req,res)=>{
    
   
   const user = await User.findOne({email:req.body.email})
   if (!user){
       return res.status(400).send("Username  wrong");
   }
    const validpass=await bycrypt.compare(req.body.password,user.password);
    console.log(user.password)
    console.log(validpass)

    if(!validpass) 
    {
        return res.status(400).send("Username or password wrong");
    }
    const token=jwt.sign({user:user},process.env.TOKEN)
    const send_user={
        token:token,
        user:user,
    }
    res.header('auth-token',token).send(send_user);  
}); 

module.exports=router;
