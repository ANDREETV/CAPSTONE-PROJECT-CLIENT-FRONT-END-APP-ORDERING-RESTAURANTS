import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

import { PencilIcon, TrashIcon, BellIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
const BASEURL = 'http://localhost:3001/orders';
const TABLE_HEAD = ['Immagine', 'Prodotto', 'Quantità', 'Prezzo', ''];
// 'Prodotto', 'Quantità',
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const orderModel = selectedOrder.orders;
  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setOpen((prevOpen) => ({ ...prevOpen, [order._id]: true }));
  };

  const handleCloseOrder = () => {
    setOpen((prevOpen) => ({ ...prevOpen, [selectedOrder._id]: false }));
  };

  const handleOpen = (product) => {
    setSelectedDelete(product);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setSelectedDelete(null);
    setOpenDelete(false);
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(BASEURL);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = async () => {
    try {
      await axios.delete(`${BASEURL}/${selectedDelete._id}`);
      getOrders();
      setSelectedDelete(null);
      setOpenDelete(false);
      localStorage.removeItem('orderMenu');
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const updateOrderStatus = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3001/orders/${id}`, {
        statusOrders: status,
      });

      console.log("Stato dell'ordine aggiornato:", response.data);
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento dello stato dell'ordine:",
        error.response.data
      );
    }
  };

  const calculateTotalCost = (orderModel) => {
    let totalCost = 0;
    orderModel.forEach((product) => {
      totalCost += product.price * product.quantity;
    });
    return totalCost;
  };

  return (
    <div className="overflow-y-auto mt-32 px-5 ">
      {/* TABLE PRODUCTS */}
      <table className=" bg-white">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 text-center"
              >
                N. Tavolo
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 text-center"
              >
                N. Persone
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center ">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 text-center"
              >
                Ordini
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 text-center"
              >
                Stato Ordine
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 text-center"
              >
                Invia Stato
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 text-center"
              >
                Totale da pagare :
              </Typography>
            </th>

            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70  text-center"
              >
                Elimina
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ _id, tableNumber, people, orders, statusOrders }) => (
            <tr key={_id}>
              <td className="p-2 w-10 sm:10 md:w-72 ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="text-center"
                >
                  {tableNumber}
                </Typography>
              </td>
              <td className="p-2 w-10 sm:10 md:w-72 ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="text-center"
                >
                  {people}
                </Typography>
              </td>
              <td className="p-2 text-center w-10 sm:10 md:w-72">
                <Button
                  onClick={() => handleOpenOrder({ _id, orders })}
                  variant="gradient"
                >
                  Ordini
                </Button>
                <Dialog
                  open={open[_id] || false}
                  handler={() => handleOpenOrder({ _id, orders })}
                  style={{ height: '500px' }}
                  className=" overflow-scroll"
                >
                  <DialogHeader>Tavolo n.{tableNumber} </DialogHeader>
                  <DialogBody divider>
                    <table className="w-full min-w-max table-auto text-left ">
                      <thead className="sticky top-1 z-20">
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70 text-center"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {orderModel && orderModel.length ? (
                          orderModel.map((product) => (
                            <tr key={product._id}>
                              <td className="p-2 flex justify-center">
                                <img
                                  src={product.image}
                                  alt={product.nameproduct}
                                  className="h-10 w-10  rounded-3xl "
                                />
                              </td>
                              <td className="p-2">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-center"
                                >
                                  {product.nameproduct}
                                </Typography>
                              </td>
                              {/* Aggiungi altre colonne in base alle tue esigenze */}
                              <td className="p-2">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-center"
                                >
                                  {product.quantity}
                                </Typography>
                              </td>
                              <td className="p-2">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-center"
                                >
                                  {product.price} €
                                </Typography>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="p-2">
                              <Typography variant="small" color="blue-gray">
                                Nessun prodotto per questa prenotazione/ordine.
                              </Typography>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </DialogBody>
                  <DialogFooter className="sticky botton-1 z-20">
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleCloseOrder}
                      className="mr-1"
                    >
                      <span>Chiudi</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </td>
              <td className="p-2 w-10 sm:10 md:w-72 text-center">
                <select
                  className="bg-transparent"
                  value={status._id}
                  onChange={handleChange}
                >
                  <option value="pending">In preparazione</option>
                  <option value="served" selected={statusOrders === 'served'}>
                    Servito
                  </option>
                  <option value="payed" selected={statusOrders === 'payed'}>
                    Pagato
                  </option>
                </select>
              </td>
              <td className="p-2 w-10 sm:10 md:w-24">
                <Typography
                  variant="small"
                  color="blue"
                  className="font-medium flex justify-center"
                >
                  <IconButton
                    onClick={() => updateOrderStatus(_id)}
                    variant="text"
                    color="green"
                  >
                    <PencilIcon strokeWidth={2} className="h-5 w-5" />
                  </IconButton>
                </Typography>
              </td>
              <td className="p-2 w-10 sm:10 md:w-24">
                <Typography
                  variant="small"
                  color="red"
                  className="font-medium flex justify-center text-xl"
                >
                  {calculateTotalCost(orders)} €
                </Typography>
              </td>
              <td className="p-2 w-10 sm:10 md:w-24">
                <Typography variant="small" className="font-medium text-center">
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
          ))}
        </tbody>
      </table>
      {/* MODALE DELETE */}
      <Dialog open={openDelete} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Attenzione!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <BellIcon className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            Se sicuro di voler eliminare questo tavolo?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="gradient" onClick={deleteOrder}>
            Si, Confermo
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
