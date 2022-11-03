import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from '@mui/material';
import ProductPerfomance from '../../src/components/dashboard/ProductPerfomance'
import { useEffect } from 'react';
import mongoose from 'mongoose';
import Product from '../../models/Product';
const Allproducts = ({products}) => {

  return (
    <ThemeProvider theme={theme}>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance products={products}/>
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  );
}

export default Allproducts


export async function getServerSideProps(context){
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find()
  console.log(products);
  return {props:{products:JSON.parse(JSON.stringify(products))}}
}