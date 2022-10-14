import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import {useEffect} from 'react'
import Link from "next/link";
import { useState } from 'react';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({cart, addToCart, removeToCart, subtotal }) => {
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
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if(myuser && myuser.token){
        setUser(myuser)
        setEmail(myuser.email)
        fetchData(myuser.token)
    }
    
}, [])
const fetchData = async (token) => {
    const data = { token: token }
    console.log(data);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    let response = await a.json();
    setAddress(response.address)
    setPhone(response.phone)
    setPincode(response.pincode)
    setName(response.name)
    getPincode(response.pincode)

}

const getPincode = async(pin)=>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    // console.log(pinJson);
    if (Object.keys(pinJson).includes(pin)){
        setState(pinJson[pin][1])
        setCity(pinJson[pin][0])
    }
    else{
        setCity('')
        setState('')
    }
}
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
            getPincode(e.target.value)
            
        }
        else{
            setCity('')
            setState('')
        }
    }  
  
}

    const intiaitePayment = async () => {

        // toast.success('Payment Intiaite Successfully', {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
           
        let oid = Math.floor(Math.random()*Date.now());
        const data = {cart , subtotal , oid , email , pincode , name ,address ,phone};
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransiction`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)         
        })

        let response = await a.json();
        if (response.success) {             
            toast.success('Payment Intiaite Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
               
            }
        
        else{
            toast.error(response.error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  
        }
        
    }   
// if (txnRes.success) {}

    //     let txnRes= await a.json();
    //     let txnToken = txnRes.txnToken

    //     var config = {
    //         "root": "",
    //         "flow": "DEFAULT",
    //         "data": {
    //             "orderId": oid, /* update order id  */
    //             "token": txnToken, /* update token value */
    //             "tokenType": "TXN_TOKEN",
    //             "amount": subtotal /* update amount */
    //         },
    //         "handler": {
    //             "notifyMerchant": function (eventName, data) {
    //                 console.log("notifyMerchant handler function called");
    //                 console.log("eventName => ", eventName);
    //                 console.log("data => ", data);
    //             }
    //         }
    //     };
// if (txnRes.success) {}
    //     window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
    //         // after successfully updating configuration, invoke JS Checkout
    //         window.Paytm.CheckoutJS.invoke();
    //     }).catch(function onError(error) {
    //         console.log("error => ", error);
    //     });
    // }
    return <div className="container mx-auto my-9 ">
    <ToastContainer/>

        {/* <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_HOST}/merchantpgpui/checkoutjs/merchants/${process.env_NEXT_PUBLIC_PAYTM_MID}.js `} crossorigin="anonymous" /> */}

        <h1 className="font-bold text-3xl my-8 text-center"> CheckOut</h1>
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
        <h1 className="font-semibold text-xl">2. Review Cart Items</h1>
        <div className="sidecart w-[100%]  bg-pink-50 p-6 m-4 z-10">

            <span className="absolute text-pink-500 top-4 cursor-pointer text-2xl right-2"><AiFillCloseCircle /></span>
            <ol className="list-decimal font-semibold">
                {Object.keys(cart).length === 0 && <div className="my-4 font-normal">You Cart is empty!</div>}
                {Object.keys(cart).map((k) => {
                    return <li key={k}>
                        <div className="item flex my-3">
                            <div className="font-semibold">{cart[k].name}</div>
                            <div className="flex items-center justify-center w-1/3 text-lg"><AiFillMinusCircle onClick={() => { removeToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer  text-pink-500" /><span className="mx-2">{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer  text-pink-500" /></div>
                        </div>
                    </li>
                })}
            </ol>
            <span className='font-bold'>Subtotal Rs: {subtotal}</span>
        </div>
        <div className='mx-4'>
            <Link href={'/checkout'}><button onClick={intiaitePayment} disabled={disabled} className="disabled:bg-pink-300 flex mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm">PayNow! {subtotal}</button></Link>
        </div>

    </div>;
};
export default Checkout;