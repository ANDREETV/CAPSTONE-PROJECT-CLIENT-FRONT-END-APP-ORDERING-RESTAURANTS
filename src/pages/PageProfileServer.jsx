import React from 'react';
import MainLayoutServer from '../Layout/MainLayoutServer';
import ProfileDataBase from '../components server/ProfileDataBase';

export default function PageProfileServer() {
  return (
    <MainLayoutServer>
      <ProfileDataBase />
    </MainLayoutServer>
  );
}
