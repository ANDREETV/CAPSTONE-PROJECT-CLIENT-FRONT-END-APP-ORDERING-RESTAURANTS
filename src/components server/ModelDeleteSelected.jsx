import { BellIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

export default function ModelDeleteSelected({
  openDeleteSelected,
  handleOpenSelected,
  handleCloseSelected,
  deleteSelectedProducts,
}) {
  return (
    <>
      <Dialog open={openDeleteSelected} handler={handleOpenSelected}>
        <DialogHeader>
          <Typography variant="h5">Attenzione!</Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <BellIcon className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            Se sicuro di voler eliminare questo/i prodotto/i selezionato/i?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" onClick={handleCloseSelected}>
            Chiudi
          </Button>
          <Button variant="gradient" onClick={deleteSelectedProducts}>
            Si, Confermo
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
