import express from 'express';
import { addDoctor, allDoctors, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';


//first we create router

const adminRouter=express.Router()
//for routing/route to add a new doctor
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor) // endpoint, middleware passed which is upload to upload form data, addDoctor is the controller function for the endpoint also the authAdmin is the middleware that is called
//now after adding middleware which is authAdmin we have to also send the token as a header apart from all the newdoctor details in body
//route, middleware, middleware, final function which handles route

//route for admin login
//for login we need post req
adminRouter.post('/login', loginAdmin); //when this route then loginAdmin function will be called which handles the post request


adminRouter.post('/all-doctors',authAdmin,allDoctors) //ye route toh ye fn call hoga and authadmin is middleware for checking admin

//route to change availability of doctor
adminRouter.post('/change-availability',authAdmin,changeAvailablity)

export default adminRouter