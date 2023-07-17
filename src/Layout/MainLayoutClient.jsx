import React from 'react';
import MyNavBar from '../components client/MyNavBar';

export default function MainLayoutClient({ children }) {
  return (
    <div>
      <MyNavBar />
      <div className=" w-full">{children}</div>
    </div>
  );
}
