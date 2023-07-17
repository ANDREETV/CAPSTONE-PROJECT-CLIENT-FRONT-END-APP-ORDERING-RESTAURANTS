import React, { createRef, useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BreadcrumbsRegister from './Breadcrumbs';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
const labelRegister = `flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500`;

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const navigate = useNavigate();
  const img = createRef();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formSubmitRegister = () => {
    if (
      user.name &&
      user.lastname &&
      user.username &&
      user.email &&
      user.password &&
      img.current.files[0]
    ) {
      let data = new FormData();
      data.append('name', user.name);
      data.append('lastname', user.lastname);
      data.append('username', user.username);
      data.append('email', user.email);
      data.append('password', user.password);
      data.append('uploadFile', img.current.files[0]);
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };

      axios
        .post('http://localhost:3001/register', data, config)
        .then((response) => {
          const { status, data } = response;
          if (status === 200 && data.status === 'Register Success') {
            setError('');
            setAlertSuccess(true);
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          } else if (status === 200 && data.error === 'Email Exists') {
            setError('Utente già registrato con la stessa email.');
          } else if (status === 200 && data.error === 'User Exists') {
            setError('Utente già registrato con lo stesso username.');
          } else {
            setError('Si è verificato un errore durante la registrazione.');
          }
        })
        .catch((error) => {
          setError('Si è verificato un errore durante la registrazione.');
        });
    } else {
      setError('Compilare tutti i campi obbligatori.');
    }
  };

  return (
    <div className="flex flex-col justify-center bg-gray-900 items-center h-screen">
      <div className="w-full sm:ps-10 ps-5 md:ps-16 lg:ps-40">
        <BreadcrumbsRegister />
      </div>
      {alertSuccess && (
        <div className="gap-3 items-center mb-5 relative w-96 text-base font-regular px-4 py-4 bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium flex">
          <CheckCircleIcon strokeWidth={2} className="h-8 w-8 " />
          <span className="font-bold">Registrazione completata</span>
        </div>
      )}

      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="white" className="text-center">
          Registarti
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <div className="relative w-full min-w-[200px] h-11">
              <input
                type="file"
                name="img"
                ref={img}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-blue-500"
              />
              <label className={labelRegister}>Foto</label>
            </div>
            <Input
              type="text"
              size="lg"
              label="Nome"
              name="name"
              onChange={handleChange}
            />
            <Input
              type="text"
              size="lg"
              label="Cognome"
              name="lastname"
              onChange={handleChange}
            />
            <Input
              type="text"
              size="lg"
              label="Username"
              name="username"
              onChange={handleChange}
            />
            <Input
              type="text"
              size="lg"
              label="Email"
              name="email"
              onChange={handleChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <Button onClick={formSubmitRegister} className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Hai già un account fai{' '}
            <Link
              className="font-medium  text-blue-700 transition-colors hover:text-white"
              to={'/login'}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
