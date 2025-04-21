import { useEffect,createContext, useState } from "react";
//import { doctors } from "../assets/assets"; WE DONT NEED THIA NYMORE BECAUSE WE NOW TAKE DATA FROM DB AND NOT THE ASSETS
/*context is a way to share data between components w/o having to pass props manuallty, */
//createContext gives an object with 2 components, provider and consumer
//provider sends data and consumer accesses it

//we import it in main and wrap <App/> component inside the App context component, this allows whole app to access its data
//whatever is used multiple times in our project, define it here
//we access the data using useContext() hook
export const AppContext=createContext();
import axios from 'axios'
import { toast } from "react-toastify";
//import { useState } from "react";
//user data ko context me store kr rhe hain


const AppContextProvider=(props)=>{ //here we created the provider component

    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL //DB KE SAATH INTEGRATE KRNE KE LIYE BACKEND URL FOR MAKING API CALLS
    const [doctors,setDoctors]=useState([]) //state variable array to store doctors after api call


    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false) //stores the token for the user after user is logged in
    //provide token in context itself so it canbe used easily
    const [userData,setUserData]=useState(false)


    const getDoctorsData = async()=>{ //UPDATED: TO GET DATA FROM DB we have to call this function
        try{
            //get method to get data ffrom endpoint of doctor list
            const {data}=await axios.get(backendUrl+'/api/doctor/list')
            if(data.success)
            {
                setDoctors(data.doctors)
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
    const loadUserProfileData= async()=>{ //WE HAVE TO RUN THIS FN WHENEVER USER LOGS IN SO WE USE USEEFFECT WITH DEPENDENCY ARRAY TOKEN
        try{
            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            if(data.success)
            {
            setUserData(data.userData)
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

    const value={ //value has all things that need to be exported
        doctors,getDoctorsData,
        currencySymbol,token,setToken,backendUrl,userData,setUserData,loadUserProfileData
    }//we can access these in any component

    useEffect(()=>{ //whenever there is a change this function is called to get refreshed data from databases
        getDoctorsData()
    },[]) //invokes efect only on mount

    useEffect(()=>{ //jab login hoga i.e jab bhi token change hoga toh ye fn call hoga
        if(token)
        {
        loadUserProfileData();
        }
        else
        {
            setUserData(false) //reset kr di saari data
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
    //any component rendered inside appcontextprovider will have access to the data(value)what
}

export default AppContextProvider

//allows context data available to any nested component without explicitly passing it tto them




