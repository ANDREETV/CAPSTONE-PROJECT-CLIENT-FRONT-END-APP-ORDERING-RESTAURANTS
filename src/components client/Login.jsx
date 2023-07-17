import React, { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import { Link, useNavigate } from 'react-router-dom';
import BreadcrumbsLogin from './BreadcrumbsLogin';
import axios from 'axios';

export default function Login() {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formSubmitLogin = () => {
    if (!user.email || !user.password) {
      setError('Compilare tutti i campi obbligatori.');
      return;
    }
    axios
      .post('http://localhost:3001/login', user)
      .then((response) => {
        const { status, data } = response;
        if (status === 201 && data.status === 'Login Success') {
          localStorage.setItem('userLogin', data.data);
          setAlertSuccess(true);
          setError('');
          setTimeout(() => {
            navigate('/prodotti');
          }, 2000);
        } else if (data.error === 'User Not found') {
          setError('Email errata.');
        } else if (data.error === 'Invalid Password') {
          setError('Password errata.');
        }
      })
      .catch((error) => {
        setError('Si è verificato un errore durante il login.');
      });
  };

  return (
    <div className="flex flex-col bg-gray-900 items-center h-screen">
      <div className="w-full h-52 ps-5 sm:ps-10  md:ps-16 lg:ps-40">
        <BreadcrumbsLogin />
      </div>
      {alertSuccess && (
        <div className="gap-3 items-center mb-5 relative w-96 text-base font-regular px-4 py-4 bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium flex">
          <CheckCircleIcon strokeWidth={2} className="h-8 w-8 " />
          <span className="font-bold">Login completata</span>
        </div>
      )}
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="white" className="text-center">
          Login
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
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
          <Button className="mt-6" fullWidth onClick={formSubmitLogin}>
            Login
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center text-white font-normal"
          >
            Se non hai un account?{' '}
            <Link
              to={'/register'}
              className="font-medium text-blue-700 transition-colors hover:text-white"
            >
              Registrati
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
