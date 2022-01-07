const Joi=require('joi');


const ComplaintValidator=data=>{
    const schema=Joi.object(
        {
        cid:Joi.string().min(6).required(),
        name:Joi.string().min(6).required(),
        phone:Joi.string().min(10).required().alphanum(),
        pincode:Joi.string().min(6).required(),
        complaint:Joi.string().min(10).required(),
        address:Joi.string()
        

    });
    return schema.validate(data);

}

const RegisterValidation=data=>{
    const schema=Joi.object(
        {
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required().alphanum(),

    });
    return schema.validate(data);

}


module.exports.RegisterValidation=RegisterValidation;

module.exports.ComplaintValidator=ComplaintValidator;