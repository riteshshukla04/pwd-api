const mongoose=require('mongoose');
const complaintSchema=new mongoose.Schema(
    {
        cid:{
            type:String,
            required:true,
            min:6
        },
        name:{
            type:String,
            required:true,
            max:255,
            min:6
        },
        phone:{
            type:String,
            required:true,
            max:10,
            min:10
        },
        pincode:{
            type:String,
            min:6,
            max:8
        },

        date:{
            type:Date,
            default:Date.now 
        },
        complaint:{
            type:String,
           
        },
        address:{
            type:String,
        
        },
        subCategory:{
            type:String,
        }
        
    }


)

module.exports=mongoose.model("Complaint",complaintSchema);