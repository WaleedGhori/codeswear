import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart , AiFillCloseCircle } from 'react-icons/ai';


const Navbar = () => {

  const togglecart = ()=>{
    console.log("i amn clicked");
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
 <div className="flex flex-col md:flex-row md:justify-start justify-center items-center my-1 shadow-md">

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
    <div onClick={togglecart} className="cart  md:absolute md:right-0 md:top-5 md:mx-5">
    <AiOutlineShoppingCart className='text-pink-600 mt-4 text-xl md:text-3xl md:my-1'/>
    </div>
    <div ref={ref} className="cart bg-pink-100 absolute right-0 top-0 p-10 transition transition-transform translate-x-full">
      <h2 className="font-bold text-xl">Shopping Cart</h2>
      <span onClick={togglecart} className="absolute top-4 cursor-pointer text-2xl right-2"><AiFillCloseCircle className="text-pink-600"/></span>
      <ul>
        <li><span>T|-shirdfgfgnb bhbv bnmg hhj</span></li>
      </ul>
    </div>
  </div>
)};
export default Navbar;