import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
//convertible, login kiya toh login aaayega aur create account kiya toh create account aayega
import axios from 'axios'; //to do api calls
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

//state==='Sign Up' && <div className='w-full'></div> what this does is shoes the div only when the state condition is true


const Login = () => {

  const {backendUrl,token,setToken}=useContext(AppContext) //ye 3 cheezein impor kri humne app context se taaki idhar use kr skaein
  const [state,setState]=useState('Sign Up'); //state variable which manages the login state

  const navigate=useNavigate()
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');



  const onSubmitHandler = async(event)=>{ //we get event from the form 
    event.preventDefault(); //it wont reload whenever we submit
    console.log('abcd')
    try{
      if(state==='Sign Up') //for registration
      {
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email}) //ye body hai api call ki
        if(data.success)
        {
          localStorage.setItem('token',data.token) //save in local storage so we dont have to login again and againa fter closing
          //save in stat evariable also
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
      else //for login
      {
        const {data}=await axios.post(backendUrl+'/api/user/login',{password,email}) //ye body hai api call ki
        if(data.success)
        {
          localStorage.setItem('token',data.token) //save in local storage so we dont have to login again and againa fter closing
          //save in stat evariable also
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
    }
    catch(error)
    {
      toast.error(data.message)
      console.log(data.message)
    }
  }

  useEffect(()=>{
    if(token)
    {
      navigate('/') //login ho gya toh homepage pe bhejdo
    }
  },[token]) //agar token update hua toh ye execute hoga

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-2-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account":"Login"} </p> {/*sets heading to signup if state variable is SignUp else sets it to login*/}
        <p>Please {state === 'Sign Up' ? "Create Account":"Login"} to Book an Appointment</p>
        {
          state==='Sign Up' && <div className='w-full'>
          <p>Full Name</p>{/* the inout form data and everything is updated and stored using state variables */}
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>  {/*here we get event e and change name by setname */}
        </div>
        }
        

        <div className='w-full'>
          <p>Email</p>{/* the inout form data and everything is updated and stored using state variables */}
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>  {/*here we get event e and change name by setname */}
        </div>

        <div className='w-full'>
          <p>Password</p>{/* the inout form data and everything is updated and stored using state variables */}
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>  {/*here we get event e and change name by setname */}
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account":"Login"}</button>
        {/*cmponent will show or will not show depending upon the state */}
        {
          state==='Sign Up'
          ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
