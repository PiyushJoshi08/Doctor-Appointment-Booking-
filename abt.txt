import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';



/*we use useParams to get parameter, whiich in this case is speciality*/
//parameter is doctors/:abcdef
//we use useParams() hook to get the parameter and store it in speciality

const Doctors = () => {

  const {speciality}=useParams();
  const [filterDoc,setFilterDoc]=useState([]); //in this array we select doctors having a particulaar speciality and show them
  //we display using filterDoc array
  /*if speciality is undefined then it meansd all doctors */
  const {doctors}=useContext(AppContext)

  const [showFilter,setShowFilter]=useState(false) //for phone hiding filter

  const navigate=useNavigate();

  const applyFilter=()=>{ //a fn to apply filter
    if(speciality) //the parameter we got
    {
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality)) //use the filter function and jinki speciality match kregi parameter se bas avhi dikhayenge
    }
    else{ //if nothing in speciality then show all
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality]) //dependency array
  //this arrow function gets executed whenevery any of doctors or speciality gets changed
  //use effect used because The dependency array determines when the effect should re-run based on changes to the dependencies

  return (
    <div>
      <div className='flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button> {/*true tha to false kr dega and false tha to true */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex':'hidden sm:flex'}`}>
          <p onClick={()=>speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General Physician')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General Physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p> {/*conditional styling done for adaptability */}
          <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}> {/*will return this div */}
              <img className='bg-blue-50'src={item.image} alt=""/>
              <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                      <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
