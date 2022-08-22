import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from "next/link";
import { BsFillBagCheckFill } from 'react-icons/bs';


const Checkout = ({ cart, addToCart, removeToCart, subtotal }) => {
    return <div className="container px-2 sm:mx-auto ">
        <h1 className="font-bold text-3xl my-8 text-center"> CheckOut</h1>
        <h1 className="font-semibold text-xl">1. Delivery Details</h1>
        <div className="mx-auto flex">
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
        </div>
        <div className="px-2 w-full">
            <div className="mb-4">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                <textarea type="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
        </div>
        <div className="mx-auto flex">
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                    <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                    <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
        </div>
        <div className="mx-auto flex">
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                    <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="px-2 w-1/2">
                <div className="mb-4">
                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                    <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
        </div>
        <h1 className="font-semibold text-xl">2. Review Cart Items</h1>
        <div  className="sidecart w-[100%]  bg-pink-50 p-6 m-4 z-10">
            
            <span  className="absolute text-pink-500 top-4 cursor-pointer text-2xl right-2"><AiFillCloseCircle /></span>
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
        <Link href={'/checkout'}><button className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm">PayNow! {subtotal}</button></Link>
        </div>

    </div>;
};
export default Checkout;