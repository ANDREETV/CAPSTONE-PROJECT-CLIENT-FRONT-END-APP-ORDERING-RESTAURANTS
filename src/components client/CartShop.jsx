import React from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CartShop({
  cart,
  removeFromCart,
  decrement,
  incrementCart,
  errors,
}) {
  return (
    <>
      <div className="flex flex-col gap-3 px-4 sm:px-5 py-32">
        {errors && <p className=" text-red-700">{errors}</p>}

        {cart.map((carts, i) => (
          <div
            key={carts._id}
            className="flex items-center justify-between mb-4 "
          >
            <div className="flex justify-start w-full">
              <img
                src={carts.image}
                alt={carts.nameproduct}
                className="h-16 w-16 me-3 rounded"
              />
              <div>
                <h4 className="font-medium text-gray-900">
                  {carts.nameproduct}
                </h4>
                <div className="flex justify-between ">
                  <p className="text-gray-500">€ {carts.price}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 text-black justify-end items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrement(i)}
                  className="bg-red-400 p-1.5  font-bold rounded"
                >
                  <MinusIcon strokeWidth={2} className="h-5 w-5" />
                </button>
                <span>{carts.quantity}</span>
                <button
                  onClick={() => incrementCart(i)}
                  className="bg-green-400 p-1.5 font-bold rounded"
                >
                  <PlusIcon strokeWidth={2} className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(carts._id)}
                className=" bg-red-400 rounded p-1.5 w-8 h-8"
              >
                <TrashIcon strokeWidth={2} className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
