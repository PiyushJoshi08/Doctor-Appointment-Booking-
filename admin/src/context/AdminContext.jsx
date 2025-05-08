import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext()

//we store login for admin login and token
const AdminContextProvider = (props)=>{  //arrow function banaya jo context provide krega

    //we will create a state variable to store token
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):''); //admin token, if local storage me token hai toh usko assign krdo otherwise empoty string
    const [doctors,setDoctors]=useState([]) //to store all doctors from api call this is used
    const [appointments,setAppointments]=useState([]) //to store list of all appointments from api call
    const [dashData,setDashData]=useState(false) //to store dashboard data from api call

    //URL of backend
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    //this function makes apoi call to get list of all doctors
    const getAllDoctors= async()=>{ //we call this function to gvet list of all doctors whenever we open the all doctors page
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}}) //empty brackets bcoz no body and then headers is the aToken
            if(data.success)
            {
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const changeAvailability= async(docId)=>{ //to change avl property using api
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}}) //api call to that route
            if(data.success)
            {
                toast.success(data.message) //if doctor's data has been updated int he database
                //we update doctor's avlbility in current state variable also
                getAllDoctors() //isse database se phirse refreshed data a jaayega humpe 'data' array me

            }
            else
            {
                toast.error(data.message)
            }
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }
    //done after makin g that adminrooute for all appointments, dont in context so that it can be saved and accessed anywhere easily
    const getAllAppointments= async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
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
            toast.error(error.message)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    //to call api endpoint to get dashboard data
    const getDashData= async(req,res)=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
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
            toast.error(error.message)
        }
    }

    const value={
        aToken,setAToken,
        backendUrl,doctors,getAllDoctors,changeAvailability,
        appointments,setAppointments,getAllAppointments,cancelAppointment,
        getDashData,dashData

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}



export default AdminContextProvider