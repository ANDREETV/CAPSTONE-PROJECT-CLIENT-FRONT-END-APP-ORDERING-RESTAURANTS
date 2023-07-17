import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Badge, Checkbox, Spinner } from '@material-tailwind/react';
import {
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from '@heroicons/react/20/solid';
import { IconButton, Typography } from '@material-tailwind/react';
import axios from 'axios';
import CartShop from './CartShop';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const filters = [
  {
    id: 'category',
    name: 'Categoria',
  },
];

const productsCategory = [
  { id: 1, name: 'Pizza', category: 'Pizza', color: 'green' },
  { id: 2, name: 'Sushi', category: 'Sushi', color: 'red' },
  { id: 3, name: 'Dolce', category: 'Dolce', color: 'amber' },
];

const BASEURL = 'http://localhost:3001/products';
const ORDERSURL = 'http://localhost:3001/orders';

export default function CategoryFilters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errors, setErrors] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([value]);
    } else {
      setSelectedCategories([]);
    }
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(product.category)
      )
    : products;

  const sortedByCategory = filteredProducts.sort((a, b) =>
    a.category.localeCompare(b.category)
  );
  const categoryOrder = ['Pizza', 'Sushi', 'Dolce'];

  const customSortedProducts = sortedByCategory.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category);
    const indexB = categoryOrder.indexOf(b.category);

    return indexA - indexB;
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const getCurrentCategoryTitle = () => {
    if (selectedCategories.length === 0) {
      return 'Tutti i prodotti';
    } else if (selectedCategories.length === 1) {
      // Get the name of the selected category
      const selectedCategoryName = productsCategory.find(
        (category) => category.category === selectedCategories[0]
      )?.name;

      return selectedCategoryName || 'Tutti i prodotti';
    } else {
      return 'Filtrati per categorie';
    }
  };

  const cartClose = () => {
    setDrawerOpen(false);
    setErrors('');
  };
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    let menuOrder = localStorage.getItem('orderMenu');
    if (!menuOrder) {
      navigate('/');
    } else {
      var menuDecoded = jwt_decode(menuOrder);
      setMenu(menuDecoded);
    }
  }, [navigate]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCart(storedCartItems);
    }
  }, []);

  const addToCart = (i) => {
    setProducts((state) =>
      state.map((item) => {
        if (i === item._id) {
          const updatedCart = [
            ...cart,
            {
              _id: item._id,
              image: item.image,
              nameproduct: item.nameproduct,
              price: item.price,
              quantity: item.quantity,
              inCart: true,
            },
          ];
          setCart(updatedCart);
          localStorage.setItem('cartItems', JSON.stringify(updatedCart));
          return { ...item, inCart: true };
        }
        setCartCount((count) => count + 1);
        return item;
      })
    );
  };

  const increment = (index) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (index === product._id) {
          const newQuantity = Math.min(product.quantity + 1, 10);

          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });
    });
  };

  const decrement = (index) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (index === product._id && product.quantity <= 1) {
          return {
            ...product,
            quantity: 1,
          };
        } else if (index === product._id && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
    });
  };

  const incrementCart = (index) => {
    setCart((prevProducts) => {
      const updatedCart = prevProducts.map((product, i) => {
        if (i === index) {
          // Incrementa la quantità fino a un massimo di 10
          const newQuantity = Math.min(product.quantity + 1, 10);

          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });
      setCart(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decrementCart = (index) => {
    setCart((prevProducts) => {
      const updatedCart = prevProducts.map((product, i) => {
        if (i === index && product.quantity <= 1) {
          return {
            ...product,
            quantity: 1,
          };
        } else if (i === index && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });

    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: (product.quantity = 1),
            inCart: false,
          };
        }
        return product;
      });
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableNumber = parseInt(menu.tableNumber);
        if (isNaN(tableNumber)) {
          console.log('Il numero del tavolo non è valido');
          return;
        }

        const response = await axios.get(`${ORDERSURL}/${menu.tableNumber}`);
        if (response.data.error === 'Tavolo non trovato') {
          console.log('Il tavolo non è stato trovato');
        } else {
          setOrders(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await axios.get(BASEURL);
        const storedCartItems =
          JSON.parse(localStorage.getItem('cartItems')) ?? [];
        const ids = storedCartItems.map((i) => i._id);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setProducts(
          response.data.map((product) => {
            if (ids.includes(product._id)) {
              return { ...product, inCart: true };
            } else {
              return product;
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getProducts();
  }, [menu]);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const addOrder = async () => {
    if (cart.length === 0) {
      setErrors("Il carrello è vuoto. Non è possibile effettuare l'ordine.");
      return;
    }

    try {
      const response = await axios.post(`${ORDERSURL}/add/${orders._id}`, {
        cart: cart,
      });
      console.log('Risposta:', response.data);
      setCart([]);
      cart.forEach((item) => removeFromCart(item._id));
      setDrawerOpen(false);
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className="text-white">
      <div
        className={`md:w-[500px] w-full sm:w-96 overflow-y-auto flex flex-col h-screen shadow-2xl shadow-blue-gray-900/10 bg-white justify-between fixed z-[9999] pointer-events-auto box-border top-0 right-0 ease-in-out ${
          drawerOpen ? 'block ' : 'hidden'
        }`}
        open={drawerOpen}
        onClose={cartClose}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between px-10 pt-10 pb-5 fixed top-0 bg-gray-100 md:w-[500px] w-full sm:w-96  ">
          <Typography variant="h5" color="blue-gray">
            Totale Carrello :
          </Typography>
          <Typography variant="h5" color="blue-gray">
            {calculateTotal()} €
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={cartClose}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>

        <CartShop
          cart={cart}
          removeFromCart={removeFromCart}
          decrement={decrementCart}
          incrementCart={incrementCart}
          errors={errors}
        />

        <Typography className="fixed bottom-0 flex justify-center md:w-[500px] w-full sm:w-96  py-10 bg-gray-100 p">
          <button
            onClick={addOrder}
            className="group relative h-12 w-48 overflow-hidden rounded-lg border-green-gray-900 text-lg shadow"
          >
            <div className="absolute inset-0 w-0 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Invia ordine
            </span>
          </button>
        </Typography>
      </div>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className={`relative z-40 lg:hidden `}
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtri
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters  */}
                  <form className={`mt-4 border-t border-gray-200`}>
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className=" flex flex-col">
                                {productsCategory.map(
                                  ({ id, category, color, name }) => (
                                    <label
                                      key={id}
                                      className="flex items-center"
                                    >
                                      <Checkbox
                                        color={color}
                                        type="checkbox"
                                        value={category}
                                        checked={selectedCategories.includes(
                                          category
                                        )}
                                        onChange={handleCategoryChange}
                                      />
                                      <span className="ml-2 text-black">
                                        {name}
                                      </span>
                                    </label>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <main
          className={`h-[113px] px-4 sm:px-6 lg:px-8 sticky bg-black  top-0 z-40 overflow-clip mb-5`}
        >
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-5 ">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Menu
              </h1>
              <p>
                Tavolo N. {menu.tableNumber} - Persone N. {menu.people}
              </p>

              {
                <p key={orders._id}>
                  Stato ordine :{' '}
                  <span
                    className={
                      orders.statusOrders === 'pending'
                        ? 'text-amber-400'
                        : orders.statusOrders === 'served'
                        ? 'text-green-400'
                        : orders.statusOrders === 'payed'
                        ? 'text-red-400'
                        : ''
                    }
                  >
                    {orders.statusOrders === 'pending' && orders._id
                      ? 'in preparazione'
                      : orders.statusOrders === 'served' && orders._id
                      ? 'servito'
                      : orders.statusOrders === 'payed' && orders._id
                      ? 'pagato'
                      : ''}
                  </span>
                </p>
              }
            </div>

            <div className="flex items-center text-green-400">
              {/* CART  */}
              <Badge content={cartCount} withBorder>
                <button
                  onClick={handleDrawerToggle}
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <ShoppingCartIcon className="h-7 w-7" aria-hidden="true" />
                </button>
              </Badge>
              {/* MOBILE FILTER */}

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </main>
        <section className="bg-black h-full flex relative justify-between">
          {/* CATEGORY */}
          <div className="w-60 lg:flex flex-col h-screen hidden fixed ">
            <div
              onClick={toggleOpen}
              className="flex cursor-pointer w-60 justify-around "
            >
              <button className=" h-10 p-2  ">
                <span>Categoria</span>
              </button>
              <span className="ml-6 flex items-center cursor-pointer">
                {open ? (
                  <MinusIcon className="h-6 w-6" />
                ) : (
                  <PlusIcon className="h-6 w-6" />
                )}
              </span>
            </div>

            {open && (
              <div className="w-60 mt-3 h-full flex ps-5 flex-col">
                {productsCategory.map(({ id, category, color, name }) => (
                  <label key={id} className="flex items-center">
                    <Checkbox
                      color={color}
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <span className="ml-2 text-white">{name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* MENU */}
          <div className=" lg:ms-80 p-10 w-full ">
            <p className="mb-10 text-2xl">{getCurrentCategoryTitle()}</p>
            {loading && (
              <div className="flex justify-center items-center h-screen mb-28">
                <Spinner className="h-16 w-16 text-blue-500/10" />
              </div>
            )}
            {!loading && (
              <div className=" grid grid-cols-1 gap-x-6 flex-wrap gap-y-10 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {customSortedProducts.map((product, i) => (
                  <div>
                    {product.inCart && (
                      <Badge
                        content={
                          <CheckIcon
                            className="h-4 w-4 text-white"
                            strokeWidth={2.5}
                          />
                        }
                        className="bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20 z-10 "
                      ></Badge>
                    )}
                    <div
                      key={product._id}
                      className="group h-full w-full text-black bg-white relative rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500 "
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.image}
                          alt={product.nameproduct}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 mb-4 flex justify-around px-2 h-[100px]">
                        <div>
                          <h2 className="text-sm font-bold text-gray-700">
                            {product.category}
                          </h2>
                          <h3 className="text-sm text-gray-700">
                            {product.nameproduct}
                          </h3>
                          <p className=" text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900 w-20 text-right">
                          {product.price} €
                        </p>
                      </div>
                      {!product.inCart ? (
                        <div className="flex justify-between items-center px-5 py-5 cursor-pointer h-20">
                          <>
                            <div className="flex gap-2 items-center">
                              <button
                                onClick={() => decrement(product._id)}
                                className="bg-red-400 p-1.5  font-bold rounded"
                              >
                                <MinusIcon
                                  strokeWidth={2}
                                  className="h-5 w-5"
                                />
                              </button>
                              <span>{product.quantity}</span>
                              <button
                                onClick={() => increment(product._id)}
                                className="bg-green-400 p-1.5 font-bold rounded"
                              >
                                <PlusIcon strokeWidth={2} className="h-5 w-5" />
                              </button>
                            </div>

                            <ShoppingCartIcon
                              onClick={() => addToCart(product._id)}
                              strokeWidth={2}
                              className="h-6 w-6"
                            />
                          </>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
