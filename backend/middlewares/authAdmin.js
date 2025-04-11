import jwt from 'jsonwebtoken'

//admin authentication middleware
//when a person tries to go to /add-doctors, this middleare is called and it checks whether there is an active token, if yes then good otherwise it blocks access to it
const authAdmin = async(req,res,next)=>{ //next is a callback function
    try{
        //if we have token in header then only we allow api call tobe  done

        const {atoken}=req.headers

        if(!atoken)
        {
            return res.json({success:false, message:'Not Authorized'});
        }

        //now we have to verify this token

        //first we decode this token
        const token_decode= jwt.verify(atoken,process.env.JWT_SECRET); //this variable has decoded token which is email_+pswd

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
        {
            return res.json({success:false, message:'Not Authorized'});
        }

        //if token is good and matches then simply call the callback function
        next();
        //In JavaScript, a callback function is a function that you pass as an argument to another function. This allows you to run the callback function once a specific event has occurred or an operation has completed.
        //for example here we call middleware to check whether user is authorized and if he is then we call the callbck function to allow the user to access the content 
    }
    catch(error){
        console.log(error)
        res.json({success:false , message:error.message});
    }
}

export default authAdmin