import { BellIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { Fragment } from 'react';

export default function ModelDeleteProduct({
  openDelete,
  handleOpen,
  handleClose,
  deleteProduct,
}) {
  return (
    <>
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
    </>
  );
}
