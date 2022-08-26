import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart , AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill } from 'react-icons/bs';
import {MdAccountCircle } from 'react-icons/md';


const Navbar = ({cart, subtotal , addToCart , removeToCart , clearCart}) => {

  const togglecart = ()=>{
    if(ref.current.classList.contains("translate-x-full")){
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    } 
    else if(!ref.current.classList.contains("translate-x-full")){
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  }
  const ref = useRef();
  
  return(
 <div className="flex flex-col md:flex-row md:justify-start justify-center items-center my-1 shadow-md sticky z-10 top-0 bg-white">

    <div className="logo mx-4">
      <Link href={'/'}><a><Image src='/codeswear.webp' alt='Codeswear' width={250} height={60}/></a></Link>
    </div>
    <div className="nav">
      <ul className="flex item-center md:space-x-4 space-x-3 font-bold md:text-md">
        <Link href={'/tshirts'}><a><li>T-Shirts</li></a></Link>
        <Link href={'/hoddies'}><a><li>Hoddies</li></a></Link>
        <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
        <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
      </ul>
    </div>
    <div  className="cart flex md:absolute md:right-0 md:top-5 md:mx-5">
    <Link href={'/login'}><a><MdAccountCircle className='text-pink-600 cursor-pointer mb-2 mt-4 text-xl md:text-3xl md:my-1 mx-4'/></a></Link>
    <AiOutlineShoppingCart onClick={togglecart} className='text-pink-600 cursor-pointer  mb-2 mt-4 text-xl md:text-3xl md:my-1'/>
    </div> 
    <div ref={ref} className={`sidecart w-[100%] sm:w-[40%] h-[75vh] md:h-[100vh] overflow-y-scroll bg-pink-50 absolute right-0 top-0 px-8 py-10 transform transition-transform ${Object.keys(cart).length !==0 ? 'translate-x-0' :  'translate-x-full'} z-10`}>
      <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
      <span onClick={togglecart} className="absolute text-pink-500 top-4 cursor-pointer text-2xl right-2"><AiFillCloseCircle/></span>
      <ol className="list-decimal font-semibold">
        {Object.keys(cart).length === 0 && <div className="my-4 font-normal">You Cart is empty!</div>}
        {Object.keys(cart).map((k)=>{return<li key={k}>
          <div className="item flex my-3">
          <div className="w-2/3 font-semibold">{cart[k].name}</div>
          <div className="flex items-center justify-center w-1/3 text-lg"><AiFillMinusCircle onClick={()=>{removeToCart(k ,1, cart[k].price , cart[k].name , cart[k].size, cart[k].variant )}} className="cursor-pointer  text-pink-500"/><span className="mx-2">{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k ,1, cart[k].price , cart[k].name , cart[k].size, cart[k].variant )}} className="cursor-pointer  text-pink-500"/></div>
          </div>
        </li>
        })}
      </ol>
      <div className='font-bold my-2'>Subtotal Rs: {subtotal}</div>

      <div className="flex">
      <Link href={'/checkout'}><button className="flex mx-2 mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm"><></><BsFillBagCheckFill className="m-1"/>Checkout</button></Link>
      <button onClick={clearCart} className="flex mx-2 mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm"><></>Clear Cart</button>

      </div>
    </div>
  </div>
)};
export default Navbar;