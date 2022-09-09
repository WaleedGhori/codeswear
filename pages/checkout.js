import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from "next/link";
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';

const Checkout = ({ cart, addToCart, removeToCart, subtotal }) => {

    const intiaitePayment = async () => {
        let oid = Math.floor(Math.random()*Date.now());
        const data = {cart , subtotal , oid , email:"email"};
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransiction`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let txnRes= await a.json();
        console.log(txnRes);
        let txnToken = txnRes.txnToken

        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": oid, /* update order id  */
                "token": txnToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": subtotal /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };

        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("error => ", error);
        });
    }
    return <div className="container px-2 sm:mx-auto ">
        <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env_NEXT_PUBLIC_PAYTM_MID}.js `} crossorigin="anonymous" />
        <script></script>
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
            <Link href={'/checkout'}><button onClick={intiaitePayment} className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-400 rounded text-sm">PayNow! {subtotal}</button></Link>
        </div>

    </div>;
};
export default Checkout;