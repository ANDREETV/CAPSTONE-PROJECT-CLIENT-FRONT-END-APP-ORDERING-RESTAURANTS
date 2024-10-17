import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Checkbox,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModelDeleteProduct from './ModelDeleteProduct';
import ModelDeleteSelected from './ModelDeleteSelected';
import ModelPutProduct from './ModelPutProduct';
const TABS = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Pizza',
    value: 'Pizza',
  },
  {
    label: 'Sushi',
    value: 'Sushi',
  },
  {
    label: 'Dolce',
    value: 'Dolce',
  },
  {
    label: 'Bere',
    value: 'Bere',
  },
];

const BASEURL = 'http://localhost:3001/products';

export default function TableProducts() {
  const [products, setProducts] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteSelected, setOpenDeleteSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [openPutModel, setOpenPutModel] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [newNameProduct, setNewNameProduct] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleOpen = (product) => {
    setSelectedDelete(product);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setSelectedDelete(null);
    setOpenDelete(false);
  };

  const handleOpenSelected = () => {
    setOpenDeleteSelected(true);
  };

  const handleCloseSelected = () => {
    setOpenDeleteSelected(false);
  };

  const handleOpenPut = (product) => {
    setSelectedProductForEdit(product);
    setOpenPutModel(true);
  };

  const handleClosePut = () => {
    setOpenPutModel(false);
  };

  const handleNameProductChange = (event) => {
    setNewNameProduct(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(BASEURL);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (searchValue === '' ||
        product.nameproduct.toLowerCase().includes(searchValue.toLowerCase()))
  );
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameA = a.nameproduct.toLowerCase();
    const nameB = b.nameproduct.toLowerCase();

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const toggleSelectAllCheckboxes = () => {
    if (selectedCheckboxes.length === filteredProducts.length) {
      setSelectedCheckboxes([]);
    } else {
      const allProductIds = filteredProducts.map((product) => product._id);
      setSelectedCheckboxes(allProductIds);
    }
  };

  const handleCheckboxChange = (productId) => {
    if (selectedCheckboxes.includes(productId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== productId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, productId]);
    }
  };

  const deleteSelectedProducts = async () => {
    try {
      await Promise.all(
        selectedCheckboxes.map((productId) =>
          axios.delete(`${BASEURL}/${productId}`)
        )
      );
      getProducts();
      setSelectedCheckboxes([]);
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await axios.put(`${BASEURL}/${updatedProduct._id}`, updatedProduct);
      getProducts(); // Aggiorna la lista dei prodotti dopo la modifica
      setOpenPutModel(false); // Chiudi il modale di modifica
    } catch (error) {
      console.error(error);
    }
  };

  const putSelectedProducts = () => {
    // Crea un oggetto con i dettagli del prodotto modificato
    const updatedProduct = {
      ...selectedProductForEdit,
      nameproduct: newNameProduct, // nuovo valore dell'input Nome prodotto,
      description: newDescription, // nuovo valore dell'input Descrizione,
      price: newPrice, // nuovo valore dell'input Prezzo,
    };

    // Chiama la funzione di aggiornamento
    updateProduct(updatedProduct);
  };

  return (
    <Card className="h-full w-full">
      <ModelDeleteProduct
        openDelete={openDelete}
        handleOpen={handleOpen}
        handleClose={handleClose}
        deleteProduct={deleteProduct}
      />

      <ModelDeleteSelected
        openDeleteSelected={openDeleteSelected}
        handleOpenSelected={handleOpenSelected}
        handleCloseSelected={handleCloseSelected}
        deleteSelectedProducts={deleteSelectedProducts}
      />
      <ModelPutProduct
        openPutModel={openPutModel}
        handleOpenPut={handleOpenPut}
        handleClosePut={handleClosePut}
        putSelectedProducts={putSelectedProducts}
        selectedProductForEdit={selectedProductForEdit}
        updateProduct={updateProduct}
        newNameProduct={newNameProduct}
        newDescription={newDescription}
        newPrice={newPrice}
        handleNameProductChange={handleNameProductChange}
        handleDescriptionChange={handleDescriptionChange}
        handlePriceChange={handlePriceChange}
      />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h3" color="blue-gray">
              Prodotti
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              color="red"
              size="sm"
              onClick={() => handleOpenSelected()}
              disabled={selectedCheckboxes.length === 0}
            >
              Delete Selected
            </Button>

            <Link to={'/aggiungi-prodotti'}>
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <PlusCircleIcon
                  strokeWidth={2}
                  className="h-5 w-5
              "
                />{' '}
                Aggiungi prodotto
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="All" className="w-full md:w-max">
            <TabsHeader className="gap-2 overflow-auto">
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setSelectedCategory(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll pt-3 px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                onClick={toggleSortOrder}
              >
                <Typography
                  variante="piccolo"
                  color="blu-grigio"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Prodotti
                  <div className="flex justify-end">
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  </div>
                </Typography>
              </th>

              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Categoria
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Prezzi
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Stato
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 w-56">
                <div className="flex items-center">
                  <Checkbox
                    checked={
                      selectedCheckboxes.length === filteredProducts.length
                    }
                    onChange={toggleSelectAllCheckboxes}
                  />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 "
                  >
                    Modifica | Elimina
                  </Typography>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Nessun prodotto trovato
                </td>
              </tr>
            ) : (
              sortedProducts
                .slice(startIndex, endIndex)
                .map(
                  (
                    {
                      _id,
                      image,
                      nameproduct,
                      description,
                      price,
                      category,
                      status,
                    },
                    index
                  ) => {
                    const isLast = index === filteredProducts.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';
                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={image} alt={nameproduct} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {nameproduct}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {description}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {category}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {price}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={status === true ? 'online' : 'offline'}
                              color={status ? 'green' : 'red'}
                            />
                          </div>
                        </td>
                        {/* <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td> */}
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue"
                            className="font-medium text-center flex items-center"
                          >
                            <Checkbox
                              checked={selectedCheckboxes.includes(_id)}
                              onChange={() => handleCheckboxChange(_id)}
                            />
                            <IconButton
                              variant="text"
                              color="green"
                              onClick={() => {
                                const selectedProduct = products.find(
                                  (product) => product._id === _id
                                );
                                handleOpenPut(selectedProduct);
                              }}
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
                    );
                  }
                )
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Pagina {currentPage} di {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Indietro
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Avanti
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
