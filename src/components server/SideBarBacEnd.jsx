import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  AccordionBody,
  AccordionHeader,
  Accordion,
} from '@material-tailwind/react';

import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import {
  PresentationChartBarIcon,
  UserCircleIcon,
  GlobeAltIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SideBarBacEnd({ openDash, closeDrawer }) {
  const [openSideBar, setOpenSideBar] = useState(0);
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpenSideBar(openSideBar === value ? 0 : value);
  };

  const handleClose = (value) => {
    setOpenSideBar(openSideBar === value ? 1 : value);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userLogin');
    navigate('/');
  };

  return (
    <>
      <Drawer open={openDash} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4 z-30">
          <Typography variant="h5" color="blue-gray">
            MENU
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => closeDrawer()}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <List>
          <Accordion
            open={openSideBar === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  openSideBar === 1 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={openSideBar === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link
                  to={'/aggiungi-prodotti'}
                  onClick={() => {
                    closeDrawer();
                    handleClose(0);
                  }}
                >
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Aggiungi Prodotti
                  </ListItem>
                </Link>
                <Link
                  to={'/prodotti'}
                  onClick={() => {
                    closeDrawer();
                    handleClose(0);
                  }}
                >
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Prodotti
                  </ListItem>
                </Link>
                <Link
                  to={'/ordini'}
                  onClick={() => {
                    closeDrawer();
                    handleClose(0);
                  }}
                >
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Ordini
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <Link to={'/profilo'} onClick={closeDrawer}>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profilo
            </ListItem>
          </Link>
          <Link to={'/'} onClick={closeDrawer}>
            <ListItem>
              <ListItemPrefix>
                <GlobeAltIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sito
            </ListItem>
          </Link>
          <Link onClick={logout}>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Esci
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}
