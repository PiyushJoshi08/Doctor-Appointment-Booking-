import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
//import { set } from 'mongoose';
import { toast } from 'react-toastify';
//to store already booked appointments by a user
const MyAppointments = () => {

  const {backendUrl, token, getDoctorsData}=useContext(AppContext); //for integrating with database we take backendurl for making api call and  token to pass as header

  const [appointments,setAppointments]=useState([]) //array to store appointments

  const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat=(slotDate)=>{ //date ko 28 July,2025 format me laane ke liye
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments=async()=>{
    try{
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success)
      {
        setAppointments(data.appointments.reverse()) //reverse to get latest sabse pehle
        console.log(data.appointments)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }


  const cancelAppointment=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success)
      {
        toast.success(data.message)
        getUserAppointments() //to update user appointments
        getDoctorsData()
      }
      else
      {
        toast.error(data.message)
      }
    }
    catch(error)
    {
      console.log(error)
      toast.error(error.message)
    }
  }

//fn to handle making payment 
  const appointmentRazorpay=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if(data.success)
      {
        console.log(data.order)
      }
      else{

      }
    }
    catch(error)
    {
      console.log(error)
      toast.error(error.message)
    }

  }


  //ab agar kabhi appointments change hue toh change krna padega so use useEffect
  useEffect(()=>{
    if(token)
    getUserAppointments()
  else{
    
  }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item,index)=>( //swho only 2
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt=""/>
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>

            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled&& <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}   {/*hide cancel button when it is already cancelled */}
              {item.cancelled&& <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
            </div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default MyAppointments
