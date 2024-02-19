import React, { createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from '@material-tailwind/react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import BreadcrumbsProduct from './BreadcrumbsProduct';

const labelRegister = `flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500`;

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [status, setStatus] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const img = createRef();
  const navigate = useNavigate();
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setStatus({ ...product, status: e.target.checked });
      setInCart({ ...product, inCart: false });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const formSubmitRegister = () => {
    if (
      product.nameproduct &&
      product.description &&
      product.price &&
      product.quantity &&
      selectedCategory &&
      inCart &&
      status &&
      img.current.files[0]
    ) {
      let data = new FormData();
      data.append('nameproduct', product.nameproduct);
      data.append('description', product.description);
      data.append('category', selectedCategory);
      data.append('status', status.status);
      data.append('price', product.price);
      data.append('quantity', product.quantity);
      data.append('inCart', inCart.inCart);
      data.append('uploadFile', img.current.files[0]);
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };

      axios
        .post('http://localhost:3001/products', data, config)
        .then((response) => {
          const { status, data } = response;
          if (status === 200 && data.status === 'Register Product Success') {
            setError('');
            setAlertSuccess(true);
            setTimeout(() => {
              navigate('/prodotti');
            }, 2000);
          } else if (status === 200 && data.error === 'Product Exists') {
            setError('Prodotto già registrato con lo stesso nome.');
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
    <div className=" flex flex-col items-center justify-center mt-10">
      {alertSuccess && (
        <div className="bg-[#2ec946]/10 text-[#2ec946] border-[#2ec946] gap-3 items-center mb-5 relative w-96 text-base font-regular px-4 py-4 border-l-4 rounded-none font-medium flex">
          <CheckCircleIcon strokeWidth={2} className="h-8 w-8" />
          <span className="font-bold">Registrazione completata</span>
        </div>
      )}

      <div className="w-full  ps-5 sm:ps-10  md:ps-16 lg:ps-40">
        <BreadcrumbsProduct />
      </div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="white" className="text-center">
          Registarti
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-5">
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
              label="Nome prodotto"
              name="nameproduct"
              onChange={handleChange}
            />
            <Input
              type="text"
              size="lg"
              label="Descrizione"
              name="description"
              onChange={handleChange}
            />
            <Input
              type="text"
              size="lg"
              label="Prezzo"
              name="price"
              onChange={handleChange}
            />
            <Input
              type="text"
              size="lg"
              label="Quantity"
              name="quantity"
              onChange={handleChange}
            />
            <select
              id="countries"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className=" bg-transparent border text-blue-gray-700 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Seleziona categoria</option>
              <option value="Pizza">Pizza</option>
              <option value="Dolce">Dolce</option>
              <option value="Sushi">Sushi</option>
              <option value="Bere">Bere</option>
            </select>
            <Checkbox
              type="checkbox"
              size="lg"
              onChange={handleChange}
              name="status"
              label="Stato"
              checked={status.status || false}
            />
            <Checkbox
              type="checkbox"
              size="lg"
              onChange={handleChange}
              name="inCart"
              checked={false}
              className="hidden"
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <Button className="" fullWidth onClick={formSubmitRegister}>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
