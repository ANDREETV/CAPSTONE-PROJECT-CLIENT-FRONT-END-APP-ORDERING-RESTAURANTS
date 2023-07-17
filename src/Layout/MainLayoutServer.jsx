import React from 'react';
import NavBarBacEnd from '../components server/NavBarBacEnd';
export default function MainLayoutServer({ children }) {
  return (
    <div className="bg-gray-900 h-screen">
      <NavBarBacEnd />
      <div>{children}</div>
    </div>
  );
}
