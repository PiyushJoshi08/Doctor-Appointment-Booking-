
//we store logic for doctor login and token
//add context in main.jsx so that we can access them anywhere in the project

import { createContext } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{  //arrow function banaya jo context provide krega

    const value={
        
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider