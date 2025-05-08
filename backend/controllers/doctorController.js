//API to add doctor in our database using the models we created

import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
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


//api for doctor login
const loginDoctor =async(req,res)=>{
    try{
        const {email,password}=req.body
        const doctor =await doctorModel.findOne({email})
        if(!doctor) //if no doctor
        {
            return res.json({success:false,message:'Invalid Credentials'})
        }
        //matche the password the user types and thre password from the database
        const isMatched = await bcrypt.compare(password,doctor.password)
        if(isMatched)
        {
            //matched then provide token
            const token= jwt.sign({id:doctor._id},process.env.JWT_SECRET)     //ISKO EK UNIQUE id dete hain and jwt secret and it gives you a token

            res.json({success:true, token}) //agar match hua toh token generate krke usko send krdo
        }
        else{
            return res.json({success:false,message:'Invalid Credentials'})
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//api to get all appointments of a particular doctor
const appointmentsDoctor=async(req,res)=>{
    try{
        const {docId}=req.body

        const appointments= await appointmentModel.find({docId})

        res.json({success:true,appointments})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}

//api to mark an appointment as completed for doctor panel
const appointmentComplete =async(req,res)=>{
    try{
        const {docId, appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId) //us appointment ki saari data li

        if(appointmentData && appointmentData.docId===docId) //to check ki sahi doctor hai ki nahi
        {
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true}) //ab usko completed mark kr diya
            return res.json({success:true, message:'Appointment Completed'})
        }
        else{
            return res.json({success:false,message:'Mark Failed'})

        }

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}



//api to cancel appointment by doctor panel
const appointmentCancel =async(req,res)=>{
    try{
        const {docId, appointmentId}=req.body
        const appointmentData= await appointmentModel.findById(appointmentId) //us appointment ki saari data li

        if(appointmentData && appointmentData.docId===docId) //to check ki sahi doctor hai ki nahi
        {
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true}) //ab usko completed mark kr diya
            console.log('1')
            return res.json({success:true, message:'Appointment Cancelled'})
        }
        else{
            console.log('2')
            return res.json({success:false,message:'Cancellation Failed'})
        }

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//api to get doctor data for dashboard

const doctorDashboard= async(req,res)=>{
    try{
        const {docId}=req.body
        const appointments=await appointmentModel.find({docId}) //to get appointments of this doctor

        let earnings=0 //to store total earning

        appointments.map((item)=>{
            if(item.isCompleted||item.payment)
            {
                earnings+=item.amount
            }
        })

        let patients=[] //to store num of patients

        appointments.map((item)=>{
            if(!patients.includes(item.userId))
            {
                patients.push(item.userId)
            }
        })

        const dashData={
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//api to get doctor profile
const doctorProfile=async(req,res)=>{
    try{
        const {docId}=req.body
        const profileData=await doctorModel.findById(docId).select('-password')

        res.json({success:true,profileData})

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//api to edit doctor profile from doctor panel
const updateDoctorProfile= async(req,res)=>{
    try{
        const {docId,fees,address,available}=req.body //doctor can update these properties

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available}) //updates these

        res.json({success:true,message:'Profile Updated'})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}

export {changeAvailablity,doctorList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile}


