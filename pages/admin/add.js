import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useState  , useEffect} from 'react';
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import e from 'cors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Add = () => {
  const [form, setForm] = useState({})
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [slug, setSlug] = useState('')
  const [desc, setDesc] = useState('')
  const [availableQty, setAvailableQty] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [img, setImg] = useState('')


  const onChange = (e)=>{
    if(e.target.name=="title"){
      setTitle(e.target.value)
    }
    else if(e.target.name=="color"){
      setColor(e.target.value)
    }
    else if(e.target.name=="size"){
      setSize(e.target.value)
    }
    else if(e.target.name=="slug"){
      setSlug(e.target.value)
    }
    else if(e.target.name=="desc"){
      setDesc(e.target.value)
    }    
    else if(e.target.name=="availableQty"){
      setAvailableQty(e.target.value)
    }    
    else if(e.target.name=="category"){
      setCategory(e.target.value)
    }   
    else if(e.target.name=="price"){
      setPrice(e.target.value)
    }
    else if(e.target.name=="img"){
      setImg(e.target.value)
    }
    // setForm({
    //   ...form,
    //   [e.target.name] : e.target.value
    // })
    // console.log(form);
  }

  //++++++++++++++++++++ Here we submit or add the product++++++++++++++++
  const submitForm = async(e) =>{
    e.preventDefault();
    const data = [{title ,slug, desc , img , color , size, category , price , availableQty }]
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProducts`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    let response = await res.json()
    setTitle(" ")
    setCategory(" ")
    setColor(" ")
    setAvailableQty(" ")
    setDesc(" ")
    setImg(" ")
    setPrice(" ")
    setSlug(" ")
    setSize(" ")
    toast.success('Product add Successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
}


  return (
    <ThemeProvider theme={theme}>
    <ToastContainer/>
       <style jsx global>{`
        footer{
          display:none
        }
      `}</style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField onChange={onChange} value={title}name="title" label="Title" variant="outlined" />
                {/* <TextField onChange={onChange} value={form.title?form.title : ""}name="title" label="Title" variant="outlined" /> */}
                <TextField onChange={onChange} value={size }name="size" label="Size" variant="outlined" />
                <TextField onChange={onChange} value={color }name="color" label="Color" variant="outlined" />
                <TextField onChange={onChange} value={slug }name="slug" label="Slug" variant="outlined" />
                <TextField onChange={onChange} value={category} name="category" label="Category" variant="outlined" />
                <TextField onChange={onChange} type='number' value={price} name="price" label="Price" variant="outlined" />
                <TextField onChange={onChange} value={img} name="img" label="Image" variant="outlined" />
                <TextField onChange={onChange} type='number' value={availableQty} name="availableQty" label="Available Qty" variant="outlined" />
                <TextField onChange={onChange} value={desc }name="desc" label="Description" multiline rows={4}/>
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

export default Add