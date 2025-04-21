import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  //first we need all doctors list so we use the api all doctors which we created
  //we destructutre data from the context
  const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext)

  useEffect(()=>{
    if(aToken)
    {
      getAllDoctors() //jab admin token change hoga toh doctors list update hogi by calling this funcction
    }
  },[aToken]) //agar admin token change ghua toh execute hoga

  //to display all doctors as a card
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
        doctors.map((item,index)=>(
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}/> {/*agar item.avl==true thwn checked hoga else nhi */}
                {/*aur agar change kiya toh phir changeaVL fn call hoga jisse database me uski availability ulti ho jaayegi current se */}
                <p>Available</p>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
