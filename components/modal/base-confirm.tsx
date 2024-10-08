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
  variant?: 'outline' | 'ghost' | 'default' | 'destructive';
};

const BaseConfirm: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  status,
  description,
  title,
  variant = 'default', // Set default value jika variant tidak didefinisikan
  textBtnConfirm
}) => {
  useEffect(() => {
    if (status === 'success') {
      setIsOpen(false);
    }
  }, [status, setIsOpen]);

  // Mengatur className berdasarkan variant
  const getVariantClassName = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-600 text-white hover:bg-red-500';
      case 'outline':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-100';
      case 'ghost':
        return 'bg-transparent text-gray-700 hover:bg-gray-100';
      case 'default':
        return '';
    }
  };

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
            className={getVariantClassName()} // Panggil fungsi getVariantClassName()
          >
            {textBtnConfirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BaseConfirm;
