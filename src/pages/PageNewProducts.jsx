import React from 'react';
import MainLayoutServer from '../Layout/MainLayoutServer';
// import NewProducts from '../components server/NewProducts';
import NewProduct from '../components server/NewProduct';

export default function PageNewProducts() {
  return (
    <MainLayoutServer>
      {/* <NewProducts /> */}
      <NewProduct />
    </MainLayoutServer>
  );
}
