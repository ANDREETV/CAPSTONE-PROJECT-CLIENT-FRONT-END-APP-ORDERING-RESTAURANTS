import React from 'react';
import MainLayoutMenu from '../Layout/MainLayoutMenu';
import CategoryFilters from '../components client/CategoryFilters';

export default function PageNewProducts() {
  return (
    <MainLayoutMenu>
      <CategoryFilters />
    </MainLayoutMenu>
  );
}
