import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            {/*left */}
           {/* <img className='mb-5 w-40'src={assets.logo} alt=""/>*/}
           <h1 className='text-5xl font-medium mb-5'>DocBook</h1>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>DocBook revolutionizes healthcare access by connecting patients with top doctors for hassle-free appointments. Our user-friendly platform offers seamless scheduling, professionals, and exceptional service, empowering you to manage your health efficiently.</p>
        </div>
        <div>
            {/*center */}
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            {/*right */}
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91-7668498607</li>
                <li>piyushmtm303442@gmail.com</li>
            </ul>

        </div>
        </div>

        {/*nicha ka alag se  copyright part*/}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright© 2025 DocBook </p>
        </div>
    </div>
  )
}

export default Footer
