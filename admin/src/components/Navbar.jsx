import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const NavBar = () => {

    const {aToken,setAToken}=useContext(AdminContext)
    const {dToken, setDToken}=useContext(DoctorContext)

    //for navigation we use useNavigate hook
    const navigate=useNavigate()

    //function to handle logout for admin
    const logout= ()=>{
        navigate('/') //user lofout krega toh usko homepage me bhej denge

        aToken && setAToken('') //if atoken is there then it sets itwith empty string

        aToken && localStorage.removeItem('aToken') //removes token frfom local storage

        dToken&& setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-20 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? "Admin" : "Doctor"}</p> {/*agar admin token hai to admin dikhaaayenge vrna doctor */}
        </div>
        <button onClick={()=>logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default NavBar
