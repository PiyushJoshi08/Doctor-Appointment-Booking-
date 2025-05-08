import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter=express.Router()

//API TO REGISTER USER
userRouter.post('/register',registerUser)


//API TO LOGIN USER
userRouter.post('/login',loginUser)


//API to get user data
userRouter.get('/get-profile',authUser,getProfile) //authuser middleware
//whe we call this api, we provide token in header so that we can authoriuze user

//API to update user data
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile) //upload middleware is there for image upoad because we send image also

//API to book appointment
userRouter.post('/book-appointment',authUser,bookAppointment) //pehle api banao then integrate in frontend

//API route to show my-appointments of a user
userRouter.get('/appointments',authUser,listAppointment) //api banao then integrate in frontend //AUTHUSER sends the userId, we dont ask for it from the user

//API route to cancel appointment /cancel-appointment
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

//API route to make payment
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)

//API route to verify payment
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter

//user router export kiya and then set up it in server.js, dine for all 3 routers