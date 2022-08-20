import { useState , useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [cart , setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
useEffect(() => {
    console.log("Yah iam runnig useEffect in _app.js");
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))

      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
     
    }

}, []);


// save the cart into localstorage with the help of Object.keys method and also apply the foor loop and here we also calculate the subtotal of all total ammount 
  const saveCart = (myCart) =>{
    localStorage.setItem('cart' , JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart)
    for (let i = 0; i<keys.length; i++) {
      subt = myCart[keys[i]].price*myCart[keys[i]].qty
    }
      setSubtotal(subt)
      console.log(cart);
  }

  // add cart
  const addToCart = (itemcode , qty , price , name ,  size , variant) =>{
    let newCart = cart;
    if(itemcode in cart){
      newCart[itemcode].qty = cart[itemcode].qty+qty;
    }
    else{
      newCart[itemcode]= {qty:1, price, name , size , variant}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  // remove cart
  const removeToCart = (itemcode , qty , price , name ,  size , variant) =>{
    let newCart = cart;
    if(itemcode in cart){
      newCart[itemcode].qty = cart[itemcode].qty-qty;
    }
    if (newCart[itemcode]["qty"]<=0) {
        delete newCart[itemcode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  // clear cart
  const clearCart = () =>{
    setCart({})
    saveCart({})
  }
    return(
  <>
  <Navbar key={subtotal} cart={cart} clearCart={clearCart} removeToCart={removeToCart} addToCart={addToCart} saveCart={saveCart} subtotal={subtotal}/>
  <Component cart={cart} clearCart={clearCart} removeToCart={removeToCart} addToCart={addToCart} saveCart={saveCart} subtotal={subtotal} {...pageProps} />
  <Footer/>
  </>
)}

export default MyApp
