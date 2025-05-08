
//we store logic for doctor login and token
//add context in main.jsx so that we can access them anywhere in the project

import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{  //arrow function banaya jo context provide krega

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    //state variable to store doctor auth token
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')

    

    const calculateAge=(dob)=>{ //function to calc age from date of birth
        const today=new Date()
        const birthDate=new Date(dob)

        let age=today.getFullYear()-birthDate.getFullYear()
        return age
    }


    //state variable to store all appointment data of a doctor
    const [appointments,setAppointments]=useState([])

    //state variable to store dashboaard data for doctor
    const [dashData,setDashData]=useState(false) //initialiszed with false because it works as an empty check when using dashData&& return( blah blah)

    //state variable to store profile data of doctor
    const [profileData,setProfileData]=useState(false)

    const getAppointments = async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dToken}})
            if(data.success)
            {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    //function to mark appointment as completed
    const completeAppointment = async(appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAppointments() //rerender appointments once we make the update
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    //function to cancel appointment by doctor
    const cancelAppointment = async(appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAppointments() //rerender appointments once we make the update
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData =async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
            if(data.success)
            {
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    //to fetch  doctor profile data from api
    const getProfileData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
            if(data.success)
            {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    


    const value={
        dToken,setDToken,backendUrl,
        appointments,setAppointments,getAppointments,
        calculateAge,
        cancelAppointment,completeAppointment,
        dashData,setDashData,getDashData,
        profileData,getProfileData,setProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider