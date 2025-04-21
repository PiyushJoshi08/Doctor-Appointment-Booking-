
import express from 'express'
import { doctorList } from '../controllers/doctorController.js'

const doctorRouter=express.Router()


//to get list of all doctors
doctorRouter.get('/list',doctorList)


export default doctorRouter