import React, { useState ,useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Myaccount = () => {

  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  }, []);
  return <div>Myaccount</div>;
};
export default Myaccount;