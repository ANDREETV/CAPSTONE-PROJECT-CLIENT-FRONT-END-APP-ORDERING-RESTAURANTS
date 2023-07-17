import React, { useState } from 'react';
import MainLayoutClient from '../Layout/MainLayoutClient';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
const BASEURL = 'http://localhost:3001/orders';

export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChangeTable = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleChangePeople = (event) => {
    setSelectedPeople(event.target.value);
  };

  const formSubmitTable = async () => {
    if (!selectedTable || !selectedPeople) {
      setError('Compilare tutti i campi obbligatori.');
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}`, {
        tableNumber: selectedTable,
        people: selectedPeople,
      });
      if (response.data.error === 'Table Exists') {
        setError('Tavolo già selezionato.');
        return;
      }
      const { data } = response;
      if (data.status === 'Send Success') {
        localStorage.setItem('orderMenu', data.data);
        setError('');
        navigate('/menu');
      } else {
        setError("Si è verificato un errore durante l'invio.");
      }
    } catch (error) {
      console.error(error);
      setError("Si è verificato un errore durante l'invio.");
    }
  };

  return (
    <MainLayoutClient>
      <div className="bodyPage flex justify-center items-center  flex-col">
        {error && (
          <div className="bg-[red]/10 text-white border-[red] gap-3 items-center mb-5 relative w-96 text-base font-regular px-4 py-4 border-l-4 rounded-none font-medium flex">
            <CheckCircleIcon strokeWidth={2} className="h-8 w-8" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <div className="bg-transparent ps-5 pe-5  mb-10 h-56 flex flex-col items-center">
          <div className="flex gap-3">
            <select
              value={selectedTable}
              onChange={handleChangeTable}
              id="table"
              className="h-10  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Seleziona il tavolo</option>
              <option value="1">Tavolo 1</option>
              <option value="2">Tavolo 2</option>
              <option value="3">Tavolo 3</option>
              <option value="4">Tavolo 4</option>
              <option value="5">Tavolo 5</option>
            </select>
            <select
              value={selectedPeople}
              onChange={handleChangePeople}
              id="people"
              className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Numero di persone</option>
              <option value="1">N. 1</option>
              <option value="2">N. 2</option>
              <option value="3">N. 3</option>
              <option value="4">N. 4</option>
              <option value="5">N. 5</option>
            </select>
          </div>
          <button
            onClick={formSubmitTable}
            className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow mt-10"
          >
            <div className="absolute inset-0 w-0 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Invia
            </span>
          </button>
        </div>
      </div>
    </MainLayoutClient>
  );
}
