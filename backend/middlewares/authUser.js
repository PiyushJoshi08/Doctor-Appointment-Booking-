//middleware to authorize user

import jwt from 'jsonwebtoken'


const authUser = async(req,res,next)=>{ //next is a callback function
    try{
        //if we have token in header then only we allow api call tobe  done

        const {token}=req.headers //user token is token taken from headers of req

        if(!token)
        {
            return res.json({success:false, message:'Not Authorized Login Again'});
        }

        //token se saath kuch krne se pehle usko decode krna padega JWT secret use krke and token has userid which we gave it when making the token

        //now we have to verify this token

        //first we decode this token
        const token_decode= jwt.verify(token,process.env.JWT_SECRET); //this variable has decoded token which is email_+pswd

        req.body.userId=token_decode.id

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

export default authUser