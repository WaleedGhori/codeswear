import React from "react";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  return <div className="flex flex-col md:flex-row md:justify-start justify-center items-center">
    <div className="logo mx-4">
      <Image src='/codeswear.webp' alt='Codeswear' width={250} height={45}/>
    </div>
    <div className="nav">
      <ul className="flex item-center md:space-x-2 space-x-3 font-bold md:text-xl">
        <Link href={'/'}><a><li>T-Shirts</li></a></Link>
        <Link href={'/'}><a><li>Hoddies</li></a></Link>
        <Link href={'/'}><a><li>Stickers</li></a></Link>
        <Link href={'/'}><a><li>Mugs</li></a></Link>
      </ul>
    </div>
    <div className="cart absolute right-0 top-2 mx-4">
      <button>Cart</button>
    </div>
  </div>;
};
export default Navbar;