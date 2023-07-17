import React, { Fragment, useEffect, useState } from 'react';
import { BellIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  DialogHeader,
} from '@material-tailwind/react';
import axios from 'axios';

const BASEURL = 'http://localhost:3001/user';

export default function ProfiloDataBase() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    let userLogin = localStorage.getItem('userLogin');
    if (!userLogin) {
      navigate('/login');
    } else {
      var userLoginDecoded = jwt_decode(userLogin);
      setUser(userLoginDecoded);
    }
  }, [navigate]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASEURL}/${id} `);
      navigate('/register');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-10 px-10 ">
      {user ? (
        <>
          <div className="px-4 sm:px-0">
            <img
              className="inline-block relative object-cover object-center !rounded-full w-[110px] h-[110px] "
              src={user.img}
              alt={user.name}
            />
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Nome e Cognome
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  {user.name} {user.lastname}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm text-white font-medium leading-6 text-white-900">
                  Email
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Elimina Account
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  <TrashIcon
                    strokeWidth={2}
                    className="h-5 w-5 cursor-pointer"
                    color="red"
                    onClick={handleOpen}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        ''
      )}
      {/* MODALE DELETE */}
      <Fragment>
        <Dialog open={openDelete} handler={handleOpen}>
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Attenzione!
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            <BellIcon className="h-16 w-16 text-red-500" />
            <Typography color="red" variant="h4">
              Se sicuro di voler eliminare questo Account?
            </Typography>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="blue-gray" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="gradient" onClick={() => deleteUser(user._id)}>
              Si, Confermo
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
}
