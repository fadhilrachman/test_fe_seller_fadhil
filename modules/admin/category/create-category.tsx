import FormGenerator from '@/components/shared/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { usePostCreateCategory } from '@/hooks/category.hook';
import { CreateCategoryType } from '@/types/category.type';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategory = (props: Props) => {
  const form = useForm({});
  const { mutateAsync, status } = usePostCreateCategory();

  const handleCreate = async (val: CreateCategoryType) => {
    try {
      await mutateAsync(val);
      form.reset({ name: '' });
    } catch (error) {
      console.log({ error });
    } finally {
      props.onClose();
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="formCreate"
          onSubmit={handleCreate}
          data={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Input category',
              label: 'Category',
              validation: {
                required: {
                  value: true,
                  message: 'Please enter category'
                }
              }
            }
          ]}
        />
        <DialogFooter>
          <Button
            loading={status == 'pending'}
            variant={'ghost'}
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button type="submit" form="formCreate" loading={status == 'pending'}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateCategory;
