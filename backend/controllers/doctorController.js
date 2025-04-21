//API to add doctor in our database using the models we created

import doctorModel from "../models/doctorModel.js";

//here we will make multiple controllers for multiple APIs


//to change availability of a doctor if he she is not available
//ye functio  hai avl change krne ke liye, iska route hai routes folder me
const changeAvailablity = async(req,res)=>{
    try{
        const {docId}=req.body //jis doctor ke liye request kiya hai uski id
        const docData=await doctorModel.findById(docId)  //database me find krne ke liye ye use hota hai

        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available}) //database me update kr diya, agar avl tha to unavl kr diya and unav tha to avl
        res.json({success:true,message:'Availablity Changed'})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}

const doctorList = async(req,res)=>{ //frontend ke liye api to get all doctors ki list
    try{
        const doctors= await doctorModel.find({}).select(['-password','-email']) //to exclude email and password
        res.json({success:true,doctors}) //doctors bhej diye jitne mile the
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}

export {changeAvailablity,doctorList}



