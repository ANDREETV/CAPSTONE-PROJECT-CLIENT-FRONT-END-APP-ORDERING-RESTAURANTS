import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  IconButton,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import SearchProducts from './SearchProducts';

const BASEURL = 'http://localhost:3001/products';

export default function TabellaProdotti() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const handleOpen = (product) => {
    setSelectedDelete(product);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setSelectedDelete(null);
    setOpenDelete(false);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(BASEURL);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setOpen(false);
    setErrors({});
  };

  const putProduct = async () => {
    try {
      const newErrors = {};
      // VALIDAZIONE DEI DATI
      if (!selectedProduct.nameproduct) {
        newErrors.nameproduct = 'Inserisci il nome del prodotto';
      }
      if (!selectedProduct.description) {
        newErrors.description = 'Inserisci la descrizione del prodotto';
      }
      if (!selectedProduct.category) {
        newErrors.category = 'Inserisci la categoria del prodotto';
      }
      if (!selectedProduct.price) {
        newErrors.price = 'Inserisci il prezzo del prodotto';
      } else if (isNaN(selectedProduct.price)) {
        newErrors.price = 'Inserisci un numero valido';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      await axios.put(`${BASEURL}/${selectedProduct._id}`, selectedProduct);
      getProducts();
      closeModal();
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`${BASEURL}/${selectedDelete._id}`);
      getProducts();
      setSelectedDelete(null);
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchResults = (results) => {
    setFilteredProducts(results);
  };

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setFilteredCategory(products);
      setFilteredProducts(products);
    } else if (category === 'Sushi') {
      const filtered = products.filter((elem) => elem.category === 'Sushi');
      setFilteredCategory(filtered);
      setFilteredProducts(filtered);
    } else if (category === 'Pizza') {
      const filtered = products.filter((elem) => elem.category === 'Pizza');
      setFilteredCategory(filtered);
      setFilteredProducts(filtered);
    } else if (category === 'Dolce') {
      const filtered = products.filter((elem) => elem.category === 'Dolce');
      setFilteredCategory(filtered);
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Card className=" fixed h-full flex bg-transparent">
        <SearchProducts
          setResults={handleSearchResults}
          products={filteredCategory}
          handleCategoryChange={handleCategoryChange}
        />

        {/* TABLE PRODUCTS */}
        <div className="overflow-y-auto mb-32 px-5">
          <table className=" table-auto text-left w-full relative bg-white">
            <thead className=" sticky top-0 z-20 " style={{ width: '736px' }}>
              <tr>
                <th className="border-b hidden md:block lg:block border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 "
                  >
                    Immagine
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70"
                  >
                    Nome Prodotto
                  </Typography>
                </th>
                <th className="border-b hidden md:block border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70"
                  >
                    Descrizione
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    Categoria
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    Stato
                  </Typography>
                </th>
                <th className="border-b hidden md:block border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    Prezzo
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70"
                  >
                    Modifica/Elimina
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(
                ({
                  _id,
                  image,
                  nameproduct,
                  description,
                  price,
                  category,
                  quantity,
                  status,
                }) => (
                  <tr key={_id}>
                    <td className="p-2 hidden md:block  ">
                      <Typography variant="small">
                        <Avatar src={image} alt={nameproduct} />
                      </Typography>
                    </td>
                    <td className="p-2 w-72">
                      <Typography variant="small">{nameproduct}</Typography>
                    </td>
                    <td className="p-2 w-content hidden md:block  ">
                      <Typography variant="small">{description}</Typography>
                    </td>
                    <td className="p-2 w-24 ">
                      <Typography variant="small" className="text-center">
                        {category}
                      </Typography>
                    </td>
                    <td className="p-2 w-24">
                      <Typography
                        variant="small"
                        className="flex justify-center"
                      >
                        {status === true ? (
                          <CheckCircleIcon
                            strokeWidth={2}
                            className="text-green-500 h-5 w-5 "
                          />
                        ) : (
                          <ExclamationCircleIcon
                            strokeWidth={2}
                            className="text-red-500 h-5 w-5"
                          />
                        )}
                      </Typography>
                    </td>
                    <td className="p-2 w-24 text-center hidden md:block ">
                      <Typography variant="small">{price}</Typography>
                    </td>
                    <td className="p-2 w-24 ">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium text-center"
                      >
                        <IconButton
                          variant="text"
                          color="green"
                          onClick={() =>
                            openModal({
                              _id,
                              image,
                              nameproduct,
                              description,
                              price,
                              category,
                              status,
                            })
                          }
                        >
                          <PencilIcon strokeWidth={2} className="h-5 w-5" />
                        </IconButton>
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() => handleOpen({ _id })}
                        >
                          <TrashIcon strokeWidth={2} className="h-5 w-5" />
                        </IconButton>
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        {/* MODALE DELETE */}
        <Fragment>
          <Dialog open={openDelete} handler={handleOpen}>
            <DialogHeader>
              <Typography variant="h5">Attenzione!</Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <BellIcon className="h-16 w-16 text-red-500" />
              <Typography color="red" variant="h4">
                Se sicuro di voler eliminare questo prodotto?
              </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="text" onClick={handleClose}>
                Chiudi
              </Button>
              <Button variant="gradient" onClick={deleteProduct}>
                Si, Confermo
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
        {/* MODAL */}
        {selectedProduct && (
          <Dialog open={open} handleClose={closeModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Modifica il prodotto</DialogHeader>
              <XCircleIcon
                className="mr-3 h-5 w-5 cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <DialogBody divider className="flex justify-center">
              <form className="mt-8 mb-2 w-80 sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    className=" text-center"
                    variant="static"
                    value={selectedProduct._id}
                    disabled
                  />
                  <Input
                    variant="static"
                    value={selectedProduct.nameproduct}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        nameproduct: e.target.value,
                      })
                    }
                    type="text"
                    size="lg"
                    name="nameproduct"
                    label="Nome"
                    error={errors.nameproduct}
                  />
                  {errors && <p>{errors.nameproduct}</p>}
                  <Input
                    variant="static"
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                    type="text"
                    size="lg"
                    name="description"
                    label="Descrizione"
                    error={errors.description}
                  />
                  {errors && <p>{errors.description}</p>}
                  <Input
                    variant="static"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }
                    type="text"
                    size="lg"
                    name="price"
                    label="Prezzo"
                    error={errors.price}
                  />
                  {errors && <p>{errors.price}</p>}
                  <Input
                    variant="static"
                    value={selectedProduct.category}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: e.target.value,
                      })
                    }
                    type="text"
                    size="lg"
                    name="category"
                    label="Categoria"
                    error={errors.category}
                  />
                  {errors && <p>{errors.category}</p>}
                </div>
              </form>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="outlined" color="red" onClick={closeModal}>
                Chiudi
              </Button>
              <Button variant="gradient" color="green" onClick={putProduct}>
                Salva la modifica
              </Button>
            </DialogFooter>
          </Dialog>
        )}
      </Card>
    </>
  );
}
