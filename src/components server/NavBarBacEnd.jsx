import { Navbar, Typography } from '@material-tailwind/react';
import SideBarBacEnd from './SideBarBacEnd';
import { useState } from 'react';
import { Bars3BottomLeftIcon } from '@heroicons/react/20/solid';

export default function NavBarBacEnd() {
  const [openDash, setOpenDash] = useState(false);
  const openDrawer = () => setOpenDash(true);
  const closeDrawer = () => setOpenDash(false);

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="rounded-none max-w-none flex items-center from-blue-gray-900 to-blue-gray-800 px-4 py-3 overflow-hidden  sticky top-0 z-10"
    >
      <div className="me-5" onClick={openDrawer}>
        <Bars3BottomLeftIcon strokeWidth={2} className="h-10 w-10" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 text-2xl cursor-pointer py-1.5"
        >
          Area riservata
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <SideBarBacEnd openDash={openDash} closeDrawer={closeDrawer} />
        </div>
        <div className="relative flex w-full gap-2 md:w-max"></div>
      </div>
    </Navbar>
  );
}
