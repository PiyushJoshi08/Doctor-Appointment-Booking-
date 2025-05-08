import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{  //arrow function banaya jo context provide krega

    const calculateAge=(dob)=>{ //function to calc age from date of birth
        const today=new Date()
        const birthDate=new Date(dob)

        let age=today.getFullYear()-birthDate.getFullYear()
        return age
    }

    const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const currency='$'

    const slotDateFormat=(slotDate)=>{ //date ko 28 July,2025 format me laane ke liye
      const dateArray=slotDate.split('_')
      return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
    } 


    const value={ //export krne ke liye idhar likhdo
        calculateAge,slotDateFormat,currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider