import { createContext } from "react";
import { doctors } from "../assets/assets";
/*context is a way to share data between components w/o having to pass props manuallty, */
//createContext gives an object with 2 components, provider and consumer
//provider sends data and consumer accesses it

//we import it in main and wrap <App/> component inside the App context component, this allows whole app to access its data
//whatever is used multiple times in our project, define it here
//we access the data using useContext() hook
export const AppContext=createContext();

const AppContextProvider=(props)=>{ //here we created the provider component

    const currencySymbol='$'

    const value={ //value has all doctors data and currency symbol
        doctors,
        currencySymbol
    }//we can access these in any component

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
    //any component rendered inside appcontextprovider will have access to the data(value)what
}

export default AppContextProvider

//allows context data available to any nested component without explicitly passing it tto them
//

