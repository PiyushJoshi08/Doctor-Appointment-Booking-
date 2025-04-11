//stores mongoose model for doctor

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true }, //mandatory
  email: { type: String, required: true, unique: true }, //mandatory and should be unique
  password: { type: String, required: true },
  image: { type: String, required: true },//has url
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default:true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true }, //when was doctor added in db
  date: { type: Number, required: true },
  slots_booked: {type: Object,default:{}} //default value of object is empty object
},{minimize:false}) //minimize false added so that we can use empty object


const doctorModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema) //it creates model named doctor having schema doctorSchema 
//if mongoose.models.doctor is avl then we use it else we make new model using this schema

export default doctorModel