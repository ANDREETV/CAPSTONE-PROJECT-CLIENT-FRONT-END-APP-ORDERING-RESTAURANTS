import React from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function ModelPutProduct({
  openPutModel,
  handleOpenPut,
  handleClosePut,
  putSelectedProducts,
  //   selectedProductForEdit,
  handleNameProductChange,
  handleDescriptionChange,
  handlePriceChange,
  newNameProduct,
  newDescription,
  newPrice,
}) {
  return (
    <Dialog open={openPutModel} handler={handleOpenPut}>
      <DialogHeader className=" gap-4">
        <PencilIcon strokeWidth={2} className="h-5 w-5 text-red-500" />
        <Typography variant="h5">Modifica prodotto!</Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <div className="mt-2 flex flex-col gap-3">
          <Input
            type="text"
            size="lg"
            label="Nome prodotto"
            name="nameproduct"
            value={newNameProduct}
            onChange={handleNameProductChange}
          />
          <Input
            type="text"
            size="lg"
            label="Descrizione"
            name="description"
            value={newDescription}
            onChange={handleDescriptionChange}
          />
          <Input
            type="text"
            size="lg"
            label="Prezzo"
            name="price"
            value={newPrice}
            onChange={handlePriceChange}
          />
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" onClick={handleClosePut}>
          Chiudi
        </Button>
        <Button variant="gradient" onClick={putSelectedProducts}>
          Si, Confermo
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
