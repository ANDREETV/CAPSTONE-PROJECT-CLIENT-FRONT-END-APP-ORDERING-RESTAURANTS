import React from 'react';
import MainLayoutServer from '../Layout/MainLayoutServer';
import TableProducts from '../components server/TableProducts';

export default function PageTable() {
  return (
    <MainLayoutServer>
      <TableProducts />
    </MainLayoutServer>
  );
}
