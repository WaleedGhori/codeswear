// import Order from '../../models/Order';
// import mongoose from 'mongoose';
import React, { useState ,useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Orders = () => {
  const [orders, setOrders] = useState([])
  const router = useRouter()
  useEffect(() => {
    
    const fetchorder = async ()=>{
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token:localStorage.getItem("token")}),         
    }) 
    let res = await a.json();
    setOrders(res.order)
    console.log(orders);
    }
    if(!localStorage.getItem('token')){
      router.push('/')
    }
    else{
      fetchorder()
    }
  
  }, []);
  return <div className="min-h-screen">
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
                      OrderId
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left text-gray-900">
                      Details
                    </th>
                    </tr>
                            
                  </thead>
                  <tbody>
                    {orders.map((item)=>{
                    return <tr key={item._id} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 '>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">{item.ammount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      <Link href={'/order?id='+item._id}><a>Details</a></Link>
                    </td>
                    </tr>})}
                  </tbody>
                  </table>
                </div>
              </div>
            </div>

        </div>
    </div>
    
  </div>;
};

// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URI)
//     }
//     let orders = await Order.findOne()

//     return {
//       props: { orders:orders }, 
//     }
//   }
export default Orders;