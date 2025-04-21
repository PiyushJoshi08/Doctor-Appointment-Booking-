import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
//these to store form data
  const [docImg,setDocImg]=useState(false) //state variable to handle doc image and upload of doc image
  const [name,setName]=useState('') //to handle doctors name
  const [email,setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [experience, setExperience]=useState('1 Year')
  const [fees, setFees]=useState('')
  const [about, setAbout]=useState('')
  const [speciality, setSpeciality]=useState('General Physician')
  const [degree, setDegree]=useState('')
  const [address1, setAddress1]=useState('')
  const [address2, setAddress2]=useState('')

  //these for api connection
  const {backendUrl, aToken}=useContext(AdminContext)


const onSubmitHandler = async(event)=>{ //event me form data hoga
  event.preventDefault(); //not reload page

  //now we call api to handle adding  doctor

  try{
    if(!docImg) //if we dont have doc image then we will show toastify notification
    {
      return toast.error('Image Not Selected')
    }
    //form data constructor se new object banaya
    const formdata=new FormData()

    formdata.append('image',docImg) //we are using image fieldname (which we made in multer) to store the image
    formdata.append('name',name)
    formdata.append('email',email)
    formdata.append('password',password)
    formdata.append('experience',experience)
    formdata.append('fees',Number(fees))
    formdata.append('about',about)
    formdata.append('speciality',speciality)
    formdata.append('degree',degree)
    formdata.append('address',JSON.stringify({line1:address1,line2:address2}))
    //we can only send string in form data so we hacve to convert object to a string using stringify {line1:address1,line2:address2}
    //ab is string ko agar objectme convert krna hai to we will use the JSON.parse method

    //console log form data
    formdata.forEach((value,key)=>{
      console.log(`${key}:${value}`)
    })

    //now we make api call to backend to save doctor details in ddatabase
    const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formdata,{headers:{aToken}}) // url of api, the data we have to ost and the admintoken for authentication
    //we get the response in this data property
    if(data.success)
    {
      toast.success(data.message)
      //reset all data
      setDocImg(false)
      setName('')
      setPassword('')
      setEmail('')
      setAddress1('')
      setAddress2('')
      setDegree('')
      setAbout('')
      setFees('')
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



  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        {/*container which will overflow i.e poora niche nhi jaayega */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" /> {/*image for upload area and createimgurl creates a temporary url for this image to be shown*/}
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/> {/*using on change and event, we store image in that state variable */}
          <p>Upload Doctor <br />Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}  className='border rounded px-3 py-2' type="email" placeholder='Email' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='border rounded px-3 py-2' type="password" placeholder='Password' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'> {/*experience ke liye */}
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id=""> {/*we select e.target.value where value is experience which we defined */}
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees}  className='border rounded px-3 py-2' type="number" placeholder='fees' required/>
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality}  className='border rounded px-3 py-2' name="" id="">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree}  className='border rounded px-3 py-2' type="text" placeholder='Education' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1}  className='border rounded px-3 py-2' type="text" placeholder='address 1' required/>
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2}  className='border rounded px-3 py-2' type="text" placeholder='address 2' required/>
            </div>



          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about}  className='w-full px-4 pt-2 border rounded' placeholder='Write about Doctor' rows={5} required/>
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

      </div>

    </form>
  )
}

export default AddDoctor
