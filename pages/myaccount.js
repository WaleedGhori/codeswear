import React, { useState ,useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Myaccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [user  ,setUser] = useState({value:null})
  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('myuser'))
      if(user && user.token){
          setUser(user)
          setEmail(user.email)
      }
      
  }, [])
  
  useEffect(()=>{
      if(name.length >3 && email.length>3 && address.length>3 && phone.length>3 && pincode.length >3){
          setDisabled(false)  
      }
      else{
          setDisabled(true)
      }
  },[name , email , address, phone ,pincode])
  
  const handleChange = async(e)=>{
      
      if(e.target.name =='name'){
          setName(e.target.value)
      }
      else if(e.target.name =='email'){
          setEmail(e.target.value)
      }
      else if(e.target.name =='address'){
          setAddress(e.target.value)
      }
      else if(e.target.name =='phone'){
          setPhone(e.target.value)
      }
      else if(e.target.name =='pincode'){
          setPincode(e.target.value)
          if(e.target.value.length == 5) {
              let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
              let pinJson = await pins.json();
              // console.log(pinJson);
              if (Object.keys(pinJson).includes(e.target.value)){
                  setState(pinJson[e.target.value][1])
                  setCity(pinJson[e.target.value][0])
              }
              else{
                  setCity('')
                  setState('')
              }
              
          }
          else{
              setCity('')
              setState('')
          }
      }  
    
  }
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      router.push('/')
    }
  }, []);
  return( 
  <div className="container mx-8 2lg:mx-auto my-9">
    <h1 className="text-3xl text-center font-bold">Update Your Account</h1>
        <h1 className="font-semibold text-xl">1. Delivery Details</h1>
        <div className="mx-auto flex">
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input onChange={handleChange} value={name} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    {user && user.token ? <input  value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> :<input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
                    {/* here i am chane value from token */}
                </div>
            </div>
        </div>
        <div className="px-2 w-full">
            <div className="mb-4">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                <textarea onChange={handleChange} value={address} type="email" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
        </div>
        <div className="mx-auto flex">
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                    <input placeholder='Enter your valid phone number' onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                    <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
        </div>
        <div className="mx-auto flex">
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                    <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div> 
            </div>
            <div className="px-2 w-1/2">
                <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                    <input onChange={handleChange}  value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
            </div>
        </div>
  </div>
)};
export default Myaccount;