import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
//for login form
//toastify se notifications add kre website me
const Login = () => {

    const [state,setState]=useState('Admin'); //whenever we ipen login page, by default the state will be login

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const {setAToken,backendUrl}= useContext(AdminContext) //setatoken function anbd backend url

    const {setDToken}=useContext(DoctorContext)


    //function to handle form submission
    const onSubmitHandler= async(event)=>{ //parameter is form event

      event.preventDefault() //to stop reloading of webpage on submitting

      //do an api call
      try{
        if(state==='Admin') //call admin login api
        {//we use axios here to make http requests , allows interaction with apis
          const {data}= await axios.post(backendUrl + '/api/admin/login', {email,password})
          if(data.success) //if true then we get a token which we log
          {
            //localst stores token in browser's local storage, persists even after page rerload or browser restyart
            //USEFUL IF WE WANT USER TO BE LOGGED IN BETWEEN SESSIONS, i.e we close the tab and come back later and token is still there
            //humne aToken naam ke variable me data.token store kr diya local storage me
            localStorage.setItem('aToken',data.token) //local storage me key aTi=oken me humne value data.token daala
            //storing token in state variable
            setAToken(data.token) //this value is lost once the page is reloaded

          }
          else //success false
          {
            toast.error(data.message)
          } //if invalid credentials then we use react toastify to show a notification of invalid credentials
        }
        else{ //call doctor login api

          const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
          if(data.success)
          {
            localStorage.setItem('dToken',data.token) //local storage me update kra
            setDToken(data.token) //current state variable me store kra
            console.log(data.token);
            
          }
          else{
            toast.error(data.message)
          }
        }
      }
      catch(error)
      {

      }
    }



  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p> {/*admin login or user login show krne ke liye */}
            <div className='w-full'>
              <p>Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input  onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base '>Login</button>
            {
          state==='Admin'
          ?<p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
          :<p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
        </div>

    </form>
  )
}

export default Login
