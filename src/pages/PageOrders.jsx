import React from 'react';
import MainLayoutServer from '../Layout/MainLayoutServer';
import Orders from '../components server/Orders';

export default function PageOrders() {
  return (
    <MainLayoutServer>
      <div className="flex justify-center">
        <Orders />
      </div>
    </MainLayoutServer>
  );
}
