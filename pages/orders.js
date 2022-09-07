import Order from '../../models/Order';
import mongoose from 'mongoose';
import React, { useState ,useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Orders = () => {

  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  }, []);
  return <div>
        <h1 className="font-semibold text-center p-8 text-2xl">My Orders</h1>
    <div className="container mx-auto">
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-6 lg:mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg-px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="border-b">
                            <tr>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                                        first
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                                        Second
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                                        Third
                                    </th>
                                </tr>
                            
                            </thead>
                            <tbody>
                                <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 '>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">Larry</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">Wild</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">@twitter</td>
                                </tr>
                                <tr  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 '>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">Larry</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">Wild</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">@twitter</td>
                                </tr>
                                <tr  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 '>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">Larry</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">Wild</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
  </div>;
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI)
    }
    let orders = await Order.findOne()

    return {
      props: { orders:orders }, 
    }
  }
export default Orders;