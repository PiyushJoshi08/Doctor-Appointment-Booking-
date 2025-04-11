import React, { use, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

/*to book new appointments and first we have to get doctor id and store it in a variable*/



const Appointments = () => {

  const {docId}= useParams() //we get doctor's id as parameter from this
  const {doctors,currencySymbol}=useContext(AppContext) //all doctors data array
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT'] //to print

  const [docInfo,setDocInfo]=useState(null)

  const [docSlots,setDocSlots]=useState([]) //state variable for slots of doctors
  const [slotIndex,setSlotIndex]=useState(0)//state variables to store slot data this and iske neeche wala
  const [slotTime,setSlotTime]=useState('')




  const fetchDocInfo = async()=>{ //to fetch data of that particulaar doctor
    const docInfo=doctors.find(doc => doc._id===docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots=async()=>{
    setDocSlots([])//reset it to empty

    //get current date and uske baaad set to next 7 dates
    let today=new Date()
    //date object in today variable
    for(let i=0;i<7;i++)
    {
      let currentDate=new Date(today) //get currdate and acc to it change date
      currentDate.setDate(today.getDate()+i)

      //end time of the day, time slots in a day

      let endTime=new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0) //21 hour, then 0 for min seconds and hours

      //set hours
      if(today.getDate()===currentDate.getDate())
      {
        //for today's appointments show only upcoming slots, not the passed ones
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
      }
      else{ //if date not today so start se saare slots dikhao
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots=[] //in this array we store timeslots with date

      //create slot every 30 min
      while(currentDate<endTime)
      {
        let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

        timeSlots.push({
          datetime:new Date(currentDate),
          time:formattedTime
        })
        //increment by 30min for slots
        currentDate.setMinutes(currentDate.getMinutes()+30)

      }

      //pass the previous slots data and append the data in the array
      setDocSlots(prev=>([...prev,timeSlots]))
    }
  }


  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId]) //used useeffect to run the fetchDocInfo function if there is any change in dependency array, i.e doctors or docinfos

  useEffect(()=>{
    getAvailableSlots() //agar docinfoc hange hui toh slots change krne padenge
  },[docInfo])


  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  return docInfo && ( //returns div only if docInfo is available
    <div>
      {/*doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=""/>
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/*Doctor info */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt=""/>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/*about doc*/}
          <div>
            <p className='flex items-center gap-1 text-sm dont-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt=""/></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/*slot booking here */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            /*if socSlots length >0 only then it maps*/
            docSlots.length && docSlots.map((item,index)=>{
              return(
              <div  onClick={()=>{setSlotIndex(index)}}  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border border-gray-200'}`} key={index}> {/*dynamic className using {} and use $ sign for dynamic css */}
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p> {/*if itm [0] is available then it displays days of week element */}
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
              )
            })
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'> {/*overflowx-scroll to add scroll functionality */}
          {docSlots.length && docSlots[slotIndex].map((item,index)=>{
            return(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-primary text-white': 'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            )
          })}
        </div>

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>

      </div>

      {/*related doctors wala component */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/> {/*we place this component with 2 props, 1 is docId and the other is speciality */}
    </div>
  )
}

export default Appointments
