import React,{useContext, useState} from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

/*navlink allows us to know which page is in active state, to allows us to set a property active int he page which is active, allows us to put underline effect in active link, underline effect done in index.css */

const Navbar = () => {

    const navigate=useNavigate();

    const [showMenu,setShowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext) //isse humko naya wala updated token mila login krne ke baad
   // const [token,setToken]=useState(true); /*token means logged in */ HATA DIYA BECAUSE YE PURANA THA, NOW UPDATED TOKEN LAAAYE FROM CONTEXT\

   const logout=()=>{ //logout button call hoone pe ye functionc all hoga and hum local storage and state variable dono me se token ko hata denge
    setToken(false)
    localStorage.removeItem('token')
   }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>{navigate('/'); scrollTo(0,0)}} className='w-20 cursor-pointer'src={assets.logo} alt=""/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'> {/*used to navigate between different compwithin a pg */}
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT US</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                /*ternary operator, shows login if not logged in and if logged in then returns nothing, i.e an empty div */
                token && userData
                ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-10 rounded-full' src={userData.image} alt=""/>
                    <img className='w-2.5'src={assets.dropdown_icon} alt=" "/>
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600  z-20 hidden group-hover:block'> {/*dropdown menu options*/}
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'> {/*hover kroge tabhi dikhega */}
                            <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p> {/*hover krke black hoga */}
                            <p onClick={logout}className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                :  <button onClick={()=>navigate('/login')}className='bg-primary text-white px-8 py-3 rounded-full font-light hidden  md:block'>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/*mobile wala menu */}
            <div className={` ${showMenu? 'fixed-w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink onClick={()=>setShowMenu(false)} to='/'><p  className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p  className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact Us</p></NavLink>
                </ul>
            </div>
           
        </div> {/*onclick and navigate hook used to navigate on actions, here it calls the navigate function*/}
    </div>
  )
}

export default Navbar
