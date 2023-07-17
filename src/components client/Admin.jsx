import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="bodyPage flex justify-center items-center  flex-col">
      <h2 className=" text-3xl  font-bold tracking-tight text-black sm:text-4xl bg-gray-50 p-2 rounded ">
        Per l'amministratore
      </h2>

      <br />
      <div className="mt-5 flex items-center justify-center gap-x-6 ">
        <Link
          to={'/login'}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Login
        </Link>
        <Link
          to={'/register'}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Registrati
        </Link>
      </div>
    </div>
  );
}
