import { useRouter } from "next/router";
import mongoose from 'mongoose';
import Order from "../models/Order";
import { useEffect , useState} from "react";
import Orders from "./orders";

const MyOrder =({order , clearCart}) => {
  const products = order.products
  const [date, setdate] = useState()
  const router = useRouter();
  useEffect(() => {
    const d = new Date(order.createdAt)
    setdate(d)
    if(router.query.clearCart ==1){
      clearCart()
    }  
  }, [])
  
  // console.log("This is a pro",products);
  // console.log("This is super order",order);
  // const router = useRouter()
  // const {orderId} = router.query
  // const [or, setOr] = useState([])
  // const fetchfunction = async() =>{
  //   let res =await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`)
  //   let orderData = await res.json();
  //   // const myJSON = JSON.stringify(orderData)
  //   setOr(orderData)
  //   console.log("iam a or",or);
  //   console.log(orderData);
  //   // console.log("myJSON",myJSON);
  // }
  // useEffect(() => {
  //   fetchfunction();
  // }, [])
  
 

  // console.log(order);
  return <div className="min-h-screen">
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
      
        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.com</h2>
        <h2 className="text-gray-900 text-3xl title-font font-medium mb-2">Order Id:#   {order.orderId}</h2>
        
        <p className="leading-relaxed mb-2">Your Oder has been successfully placed.</p>
        <p className="leading-relaxed mb-2">Order placed on: {date && date.toLocaleDateString("en-Us",{weekyear: "long" , year:"numeric" ,month:"long" ,day:"numeric"})}.</p>
        <p className="mb-4">Your payment is <span className="font-semibold">{order.status}</span></p>
        <div className="flex mb-4">
          <a className="flex-grow py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow py-2 text-lg px-1">Item Total</a>
        </div>
       
          
        {Object.keys(products).map((key)=>{
        return <div key={key} className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
            <span className="ml-auto text-gray-900">{products[key].qty}</span>
            <span className="ml-auto text-gray-900">{products[key].price}</span>
        </div>})}
        
          
        {/* <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Wear the Code</span>
          <span className="ml-auto text-gray-900">2</span>
          <span className="ml-auto text-gray-900">999</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Wear the Code</span>
          <span className="ml-auto text-gray-900">3</span>
          <span className="ml-auto text-gray-900">999</span>
        </div> */}
        <div className="flex flex-col my-8">
          {Object.keys(products).map((key)=>{return <span key={key} className="title-font font-medium text-2xl text-gray-900">SubTotal:{products[key].price} pkr</span>})}
          <div className="my-4">
          <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
          </div>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>;
  </div>;
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  // console.log(context);
  let order = await Order.findById(context.query.id)
  return {
    props: { order: JSON.parse(JSON.stringify(order))}, // will be passed to the page component as props
  }
}
export default MyOrder;