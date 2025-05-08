
import express from 'express'
import { doctorList, loginDoctor,appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter=express.Router()


//to get list of all doctors
doctorRouter.get('/list',doctorList)

//api route to login doctor
doctorRouter.post('/login',loginDoctor)

//api route to get all appointments of a doctor
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)


//api to complete an appointment by doctor
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)

//api to cancel an appoiuntment by doctor
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel) //docId milegi auth doctor se so no need

//api to get doctor dashboaard
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)

//api top get doctor profile data for doctor panel
doctorRouter.get('/profile',authDoctor,doctorProfile)

//api to edit doctor profile from doctor panel
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter