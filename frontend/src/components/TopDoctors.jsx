import React from 'react'
//import { doctors } from '../assets/assets' not needed after context
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
const TopDoctors = () => {
/*we can call programatically, eg press of button or after some logic executed */
/*Linkto refers to a static page */


    const {doctors}=useContext(AppContext) //importing the doctor using useContext hook
    const navigate= useNavigate(); /*useNavigate hook of react */





  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of doctors</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'> {/*only display top 10 so slivce it and then map it*/}
        {doctors.slice(0,10).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition all duration-500'key={index}> {/*will return this div */}
            <img className='bg-blue-50'src={item.image} alt=""/>
            <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available?'text-green-500' :'text-gray-500'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500':'bg-gray-500'} rounded-full`}></p><p>{item.available? 'Available': 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctors
