//to control actions like- booking appointment, cancelling appointments, login, register, get profile, show profile, etc
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

//STEPS====> CONTROLLER->ROUTE->FRONTEND INTEGRATION

//api to register user
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        if(!name||!email||!password)
        {
            return res.json({success:false,message:'MISSING DETAILS'})
        }

        //check if email correct
        if(!validator.isEmail(email)) //valid then true
        {
            return res.json({success:false,message:'Enter a Valid Email'})   
        }

        if(password.length<8)
        {
            return res.json({success:false,message:'Enter a Strong Password'})   
        }
        //now add user to database
        //first hash using bcrypt
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        
        const userData={name,email,password:hashedPassword}

        //save userdata in database
        const newUser=new userModel(userData) //this is how we create a new user, by using usermodel as a class and uska ibject banate hain
        const user=await newUser.save() //isse save ho jaayega vo new user

        //in this user we get an _id property and a token with which user can login to the website
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET) //user id and jwt secret
        //idhar token me humne userid di hai taaki use kr sakein baad me
        //token generate ho gya

        //now we return response
        res.json({success:true,token})
        
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API for user Login

const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email}) //use this to find in database or collectiibns

        if(!user) //if noo user with this email
        {
            return res.json({success:false,message:'User does not exist'}) //return to terminate the function here
        }

        const isMatch=await bcrypt.compare(password,user.password); //entered password and database password agar match kra toh true

        if(isMatch) //agar match kr gye
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true, token}); //tokebn bhejenge
        }
        else{
            res.json({success:false,message:'Incorrect Password'})
        }
            
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API to get user profile data
//STEPS- API banao controller me for caling etc and phir uska route banao routes me taaki vo api call ho us endpoint pe agar hit krein to

const getProfile=async(req,res)=>{
    try{
        const {userId}=req.body //we get user id from token that we send

        //finding user's data through userModel
        const userData=await userModel.findById(userId).select('-password')

        res.json({success:true,userData})

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API to update user profile
const updateProfile=async(req,res)=>{
    try{
        //isme userId user nahi bhejega, user bas name, pghone etc bhejega
        //userId humko token se milegi which we get when we call authUser middleware
        const {userId,name,phone,address,dob,gender}=req.body //api call me ye sab kuch dena padega

        const imageFile=req.file

        if(!name||!phone||!dob||!gender)
        {
            return res.json({success:false,message:'Missing Data'});
        }
        //parse adress to get it as string
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        //ye sab properties update kr dega

        if(imageFile)
        {
            //upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'}) //upload karo
            const imageURL=imageUpload.secure_url //uska url lo

            //ab is url ko update krdo collection me
            await userModel.findByIdAndUpdate(userId,{image:imageURL})
            res.json({success:true,message:'Profile Updated'}) //uska  cloudinaryurl return krdo
        }
        else{
            res.json({success:true,message:'Profile Updated'})
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API to make an appointment for book-appointment page
const bookAppointment= async(req,res)=>{
    try{
        const {userId, docId, slotDate,slotTime}=req.body

        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available) //agar doctor available nhii hai
        {
            return res.json({success:false,message:'Doctor not available'})
        }

        let slots_booked=docData.slots_booked //isme doctor ke saare slots booked mil jaayenge

        if(slots_booked[slotDate])
        {
            if(slots_booked[slotDate].includes(slotTime))
            {
                return res.json({success:false,message:'Slot not available'})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{ //agar date me saare free hain
           slots_booked[slotDate]=[]
           slots_booked[slotDate].push(slotTime) 
        }

        const userData=await userModel.findById(userId).select('-password')
        delete docData.slots_booked //slots booked hata do temp se because appointment ke andar us docotr ke saare appointment store krne ka faida nahi hai

        //MAKE AN APPOINTMENT
        const appointmentData={
            userId,docId,userData,docData,amount:docData.fees,slotTime,slotDate,date:Date.now()
        }
        //now save this appointment in database
        const newAppointment =new appointmentModel(appointmentData)
        await newAppointment.save() //save method se save hoga

        //save new slots data in doctor's data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked}) //updates slots_booked in database with this local slots_booked variable

        res.json({success:true,message:'Appointment Booked'})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API to get list of all appointments a user has booked for myAppointments page
const listAppointment =async(req,res)=>{
    try{
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId}) //isse array mil jaayegi having all the appointments of this user id
        res.json({success:true,appointments})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API controller to cancel an appointment
const cancelAppointment = async(req,res)=>{
    try{
        const {userId, appointmentId}=req.body

        const appointmentData=await appointmentModel.findById(appointmentId)

        //verify appointment user ki kaheen koi aur na krde cancel. iske liye user ka diya hua input should match userAuth se aaya user
        if(appointmentData.userId!=userId)
        {
            return res.json({success:false,message:'Unauthorized Action'})
        }

        //cancelled property true krni padegi
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true}) //cancelled property true krdi

        //ab cancelled ho gya toh vo slot available ho jaayega doctor ka
        const {docId,slotDate,slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked //getting unupdates slots of that doctor
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime) //making new array by removing slot
        await doctorModel.findByIdAndUpdate(docId,{slots_booked}) //updating new array
        res.json({success:true,message:'Appointment Cancelled'})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}



//making a new instance
const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

//API controller to make payment RAZORPAY
const paymentRazorpay =async(req,res)=>{

    try{
    const {appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)

    if(!appointmentData||appointmentData.cancelled)
    {
        return res.json({success:false,message:'Appointment Cancelled or Not Found'})
    }

    //creating options for razorpay payment
    const options={
        amount:appointmentData.amount*100,
        currency:process.env.currency,
        receipt:appointmentId,
    }

    //creating an order in razorpay
    const order = await razorpayInstance.orders.create(options)
    res.json({success:true,order})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}


//API controller to verify payment of razorpay and update payment to true
const verifyRazorpay = async(req,res)=>{
    try{
        const {razorpay_order_id}=req.body
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id) //order info mil jaayegi
        
        if(orderInfo.status==='paid')
        {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:'Payment Successful'})
        }
        else{
            res.json({success:false,message:'Payment Failed'})
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }
}



export {registerUser,loginUser,getProfile,updateProfile,bookAppointment, listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay}

//NOTE:userdata ko context me daaldo taaki har jagah access kr sakein
// after making all integrqate all these with frontend