import { createContext } from "react";
import { useState } from "react";
export const AdminContext = createContext()

//we store login for admin login and token
const AdminContextProvider = (props)=>{  //arrow function banaya jo context provide krega

    //we will create a state variable to store token
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):''); //admin token, if local storage me token hai toh usko assign krdo otherwise empoty string

    //URL of backend
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const value={
        aToken,setAToken,
        backendUrl

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider