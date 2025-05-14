import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  onDelete: () => void;
  title: string;
  description?: string;
}

const DeleteDialog = (props: Props) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Delete {props.title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {props.description ||
            'Delete this data? This will remove it from master data permanently'}
        </DialogDescription>
        <DialogFooter>
          <Button variant={'ghost'} onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant={'destructive'}
            onClick={props.onDelete}
            loading={props.loading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDialog;
