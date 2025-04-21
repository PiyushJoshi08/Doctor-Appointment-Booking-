import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

//Admin can add a doctor, this is API for adding a doctor from admin panel

const addDoctor=async(req,res)=>{ //req and res as param

    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body; //we extract and store all this data from req.body
        //we will add these data in a form data format and for this we need a middleware
        const imageFile=req.file

        //first check whether all data is available to add a new doctor
        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address)
        {
            return res.json({success:false, message:"Missing Details"}); //we return ab object with succrss peoperty false anfd message as this
        }

        //validate email format using validator package
        if(!validator.isEmail(email)) //email is not in valid format
        {
            return res.json({success:false, message:"Please enter a valid email"});
        }

        //check if password is strong or not
        if(password.length<8)
        {
            return res.json({success:false, message:"Please enter a strong password"});   
        }

        //now we encrypt the password using bcrypt
        //hashing the doctor' password
        const salt=await bcrypt.genSalt(10); //salt is a random value which is used to make hashing process more secure. by adding unique salt to each pswd before hashing even if 2 users have saame password, their resulting hashes will be different
        //the number 10 is the salt rounds which is the number of times the hashing algorithm is run, more secure but more time
        //await indicatez that the bcrypt.gensalt() returns a promise and the code waits for the salt to be generated before moving on
        const hashedPassword= await bcrypt.hash(password,salt);//hashes the plain text passowrd using the salt, we store hashed password in our database

        //now we upload image file in cloudinary and get image url which we store in our database
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});  //we give image ka path and then resource type which here is an image
        //imageUpload will receive a value which will be the imageurl and many other things
        const imageUrl=imageUpload.secure_url;



        //create data model for doctor
        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address), //address is a json string and it parses it into a JS objecgt using json.parse
            // parse convertsconverts js string into js object
            //this will store address an object in database
            //using JSON.parse() methood
            date:Date.now()
        }

        //now we save data in database
        const newDoctor= new doctorModel(doctorData); //we create a new doctor using this
        await newDoctor.save(); //now our new doctor is stored in the database

        res.json({success:true, message:"Doctor Added"})

    }
    catch(error){

        console.log(error);
        res.json({success:false , message:error.message});
    }
}

//api for admin login , so that only the admin can add doctors

const loginAdmin = async( req, res)=>{
    try{
        //get email id and pswd from req and compare it with admin pswd and email
        const {email,password}=req.body;

        if(email === process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD)
        {
            //if both match thwen we will generate a token
            const token = jwt.sign(email+password,process.env.JWT_SECRET) //we provide a string which is email+password and we provide jwt secret
            //it encrypts that data and creates a token and stores it in token
            //study about JWT
            res.json({success:true , token});
            //now using this token, we allow thee admin to log into the admin panel
            //so what we do is we create a middleware for /add-doctor, whenever a person tries go to add-doctor, he/she can pass only if there is an aactive working token

        }
        else{
            res.json({success:false , message:"Invalid Credentials"});
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false , message:error.message});
    }
}

//API to get all doctors list for admin panel

const allDoctors= async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password') //remove the password property from query
        res.json({success:true,doctors})//we send doctor data and success=true
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false , message:error.message});
    }

}

export {addDoctor , loginAdmin, allDoctors} //we export thuis function and create a new route in routes