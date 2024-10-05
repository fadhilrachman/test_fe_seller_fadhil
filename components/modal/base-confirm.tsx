'use client';
import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  textBtnConfirm: string;
  onConfirm: () => void;
  status: 'idle' | 'error' | 'pending' | 'success' | undefined;
  description: string;
  title: string;
};

const BaseConfirm: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  status,
  description,
  title,
  textBtnConfirm
}) => {
  useEffect(() => {
    if (status === 'success') {
      setIsOpen(false);
    }
  }, [status, setIsOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={status === 'pending'}
          >
            {textBtnConfirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BaseConfirm;
