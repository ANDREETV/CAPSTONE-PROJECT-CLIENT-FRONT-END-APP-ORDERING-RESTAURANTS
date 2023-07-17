import React from 'react';

export default function MainLayoutClient({ children }) {
  return (
    <div className=" bg-black h-screen">
      <div className="h-screen ">{children}</div>
    </div>
  );
}
