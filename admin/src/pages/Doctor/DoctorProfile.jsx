import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  
  const {dToken,profileData,setProfileData,getProfileData,backendUrl}=useContext(DoctorContext)
  const {currency}=useContext(AppContext)

  //to set state wherther we are in edit mode or not
  const [isEdit,setIsEdit]=useState(false)

  //NOTE:WE MADE THIS AXIOS CALL HERE AND NOT IN DOC CONTEXT BECAUSE WE HAD TO USE STATE VARIABLES FOR THIS WHICH IS LIMITS
  //IT TOTALLY DEPENDS ON US, WE COULD HAVE MADE THIS FROM DOCTOR CONTEXT AS WELL AND NO ISSUE WOULD HAVE BEEN THERE
  const updateProfile=async()=>{ //used to make permanaent changes to database once save is clicked, basically to call the function which makes axios call
    try{
     const updateData={ //pehle ek object me sab new data store krenge and phir updatekrenge
      address:profileData.address,
      fees:profileData.fees,
      available:profileData.available
     }

     const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})

     if(data.success)
     {
      toast.success(data.message)
      setIsEdit(false) //set edit to false
      getProfileData() //called to again get the new updated data
     }
     else{
      toast.error(data.message)
     }
    }
    catch(error)
    {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(()=>{
    if(dToken)
    {
      getProfileData()
    }
  },[dToken])

  return profileData && ( //agar profile data hai tabhi dikhao
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/*doc info here */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/*doctor about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>Appointment Fee: <span className='text-gray-800'>{currency} {isEdit? <input type="number" onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}/> :profileData.fees}</span></p> {/*baaki sab same rakha bas fees update krne ke liye aisa krna hai */}

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/>:profileData.address.line1} {/*nested spread operator */}
              <br />
              {isEdit? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/>:profileData.address.line2}
            </p>

          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" name="" id=""/> {/*agar checked tru ehoga toh check mark ho jaayega else no */}
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
            : <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }
        
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
