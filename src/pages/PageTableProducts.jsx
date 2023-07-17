import React from 'react';
import TabellaProdotti from '../components server/TabellaProdotti';
import MainLayoutServer from '../Layout/MainLayoutServer';

export default function PageTableProducts() {
  return (
    <MainLayoutServer>
      <TabellaProdotti />
    </MainLayoutServer>
  );
}
