import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from 'react-icons/ai';


const Navbar = () => {
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
    <div className="cart  md:absolute md:right-0 md:top-5 md:mx-5">
     <button><AiOutlineShoppingCart className='text-pink-600 mt-4 text-xl md:text-3xl md:my-1'/></button>
    </div>
  </div>
)};
export default Navbar;