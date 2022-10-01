import React, { useRef , useState ,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart , AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill } from 'react-icons/bs';
import {MdAccountCircle } from 'react-icons/md';
import { useRouter } from "next/router";


const Navbar = ({logout ,user , cart, subtotal , addToCart , removeToCart , clearCart}) => {
const [dropDown, setDropDown] = useState(false);
const [sidebar, setSidebar] = useState(false)
const cartref = useRef();
const router = useRouter()
useEffect(() => {
  Object.keys(cart).length !==0  && setSidebar(true)
  let exempted = ['/checkout', '/login', '/orders', 'order']
  if(exempted.includes(router.pathname)){
    setSidebar(false)
  }
  if(router.pathname == '/signup'){
    setSidebar(false)
  }
  if(router.pathname == '/forgot'){
    setSidebar(false)
  }
  if(router.pathname == '/tshirts'){
    setSidebar(false)
  }
  if(router.pathname == '/hoddies'){
    setSidebar(false)
  }
  if(router.pathname == '/stickers'){
    setSidebar(false)
  }
  if(router.pathname == '/mugs'){
    setSidebar(false)
  }
  if(router.pathname == '/'){
    setSidebar(false)
  }
}, [])

  const togglecart = ()=>{
    setSidebar(!sidebar)
    // if(cartref.current.classList.contains("translate-x-full")){
    //   cartref.current.classList.remove("translate-x-full")
    //   cartref.current.classList.add("translate-x-0")
    // } 
    // else if(!cartref.current.classList.contains("translate-x-full")){
    //   cartref.current.classList.remove("translate-x-0")
    //   cartref.current.classList.add("translate-x-full")
    // }
  }
  

  return(
    <>
     {!sidebar && <span >
      {dropDown &&  
      <div onMouseOver={()=>setDropDown(true)} onMouseLeave={()=>setDropDown(false)} className="absolute right-14 py-4 bg-pink-50 shadow-lg top-[3.7rem] rounded-md px-5 w-32 z-30">
        <ul>
          <Link href={'/myaccount'}><a><li className="py-1 hover:text-pink-700 font-bold text-sm">My Account</li></a></Link>
          <Link href={'/orders'}><a><li className="py-1 hover:text-pink-700 font-bold text-sm">Orders</li></a></Link>
          <li onClick={logout} className="py-1 hover:text-pink-700 font-bold text-sm">LogOut</li>
        </ul>
      </div>}
    
      </span>}
 <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center my-1 shadow-md sticky z-10 top-0 bg-white ${!sidebar&& 'overflow-hidden'}`}>

    <div className="logo mx-4">
      <Link href={'/'}><a><Image src='/codeswear.webp' alt='Codeswear' width={250} height={60}/></a></Link>
    </div>
    <div className="nav">
      <ul className="flex item-center md:space-x-4 space-x-3 font-bold md:text-md">
        <Link href={'/tshirts'}><a><li className="hover:text-pink-700">T-Shirts</li></a></Link>
        <Link href={'/hoddies'}><a><li className="hover:text-pink-700">Hoddies</li></a></Link>
        <Link href={'/stickers'}><a><li className="hover:text-pink-700">Stickers</li></a></Link>
        <Link href={'/mugs'}><a><li className="hover:text-pink-700">Mugs</li></a></Link>
      </ul>
    </div>
    <div  className="cart my-3 md:m-auto items-center flex md:absolute md:right-0 md:top-5 md:mx-5">

    {!user.value && <Link href={'/login'}>
      <a><button className="bg-pink-600 px-3 py-1 rounded-md text-md text-white mx-4  ">Login</button></a>
    </Link>}
    {/* here we w=need to writw asome dropdown code 0000000=======  */}
    <span onMouseOver={()=>setDropDown(true)} onMouseLeave={()=>setDropDown(false)}>
    {user.value && <MdAccountCircle  className='text-pink-600 cursor-pointer mb-2 text-xl md:text-3xl md:my-1 mx-4'/>}
    </span>


    <div className="px-2 rounded-md border-2 py-1 border-pink-600"><AiOutlineShoppingCart onClick={togglecart} className='text-pink-600  cursor-pointer text-xl '/> </div>
    </div> 
    <div ref={cartref} className={`sidecart w-[100%] sm:w-[40%] h-[75vh] md:h-[100vh] overflow-y-scroll bg-pink-50 absolute top-0 px-8 py-10  transition-all  ${sidebar?'right-0':'-right-[40rem]'} z-10`}>
   
    
      <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
      <span onClick={togglecart} className="absolute text-pink-500 top-4 cursor-pointer text-2xl right-2"><AiFillCloseCircle/></span>
      <ol className="list-decimal font-semibold">
        {Object.keys(cart).length === 0 && <div className="my-4 font-normal">You Cart is empty!</div>}
        {Object.keys(cart).map((k)=>{return<li key={k}>
          <div className="item flex my-3">
           <div className="w-2/3 font-semibold">{cart[k].name} ({cart[k].variant}/{cart[k].size})</div>
            <div className="flex items-center justify-center w-1/3 text-lg">
             <AiFillMinusCircle onClick={()=>{removeToCart(k ,1, cart[k].price,cart[k].name , cart[k].size, cart[k].variant )}} className="cursor-pointer  text-pink-500"/>
             <span className="mx-2">{cart[k].qty}</span>
             <AiFillPlusCircle onClick={()=>{addToCart(k ,1, cart[k].price , cart[k].name , cart[k].size, cart[k].variant )}} className="cursor-pointer  text-pink-500"/>
           </div>
          </div>
        </li>
        })}
      </ol>
      <div className='font-bold my-2'>Subtotal Rs: {subtotal}</div>

      <div className="flex">
      <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mx-2 mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm"><></><BsFillBagCheckFill className="m-1"/>Checkout</button></Link>
      <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-pink-300 flex mx-2 mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm"><></>Clear Cart</button>

      </div>
    </div>
  </div>
  </>

)};
export default Navbar;