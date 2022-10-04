/* eslint-disable react-hooks/exhaustive-deps */
import Router, { useRouter } from 'next/router';
import { useState , useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [cart , setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState({value:null});
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0)
  const router =useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart' , ()=>{
    setProgress(40)
  })
    router.events.on('routeChangeComplete' , ()=>{
    setProgress(100)
  })

    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))

      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
     
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
      setUser({value:myuser , email:myuser.email})
    }
    setKey(Math.random())

}, [router.query]);

// logout from account
const logout = () =>{
 localStorage.removeItem('myuser')
 setUser({value:null})
 setKey(Math.random())
 router.push('/')
} 



// save the cart into localstorage with the help of Object.keys method and also apply the foor loop and here we also calculate the subtotal of all total ammount 
  const saveCart = (myCart) =>{
    localStorage.setItem('cart' , JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart)
    for (let i = 0; i<keys.length; i++) {
      subt += myCart[keys[i]].price*myCart[keys[i]].qty
    }
      setSubtotal(subt)
      // console.log(cart);
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
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemcode in cart){
      newCart[itemcode].qty = cart[itemcode].qty-qty;
    }
    if (newCart[itemcode]["qty"]<=0) {
        delete newCart[itemcode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  //buyNow

  const buyNow =(itemcode , qty , price , name ,  size , variant)=>{
    let newCart = {}
    newCart[itemcode] = {qty:1 , price ,name ,  size , variant}
    saveCart(newCart);
    setCart(newCart);
    router.push('/checkout')
  }

  // clear cart
  const clearCart = () =>{
    setCart({})
    saveCart({})
  }
    return(
  <>
  <LoadingBar
        color='#EC427A'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  {key &&<Navbar logout={logout} user={user} buyNow={buyNow} key={key} cart={cart} clearCart={clearCart} removeToCart={removeToCart} addToCart={addToCart} saveCart={saveCart} subtotal={subtotal}/>}
  <Component  buyNow={buyNow} cart={cart} clearCart={clearCart} removeToCart={removeToCart} addToCart={addToCart} saveCart={saveCart} subtotal={subtotal} {...pageProps} />
  <Footer/>
  </>
)}

export default MyApp
