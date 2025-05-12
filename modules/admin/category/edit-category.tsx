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
import { usePutEditCategory } from '@/hooks/category.hook';
import { CategoryType, CreateCategoryType } from '@/types/category.type';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: CategoryType | undefined;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

const EditCategory = (props: Props) => {
  const form = useForm({});
  const { mutateAsync, status } = usePutEditCategory(props.data?.id || '');

  const handleEdit = async (val: CreateCategoryType) => {
    try {
      await mutateAsync(val);
      form.reset({ name: '' });
    } catch (error) {
      console.log({ error });
    } finally {
      props.onClose();
    }
  };

  useEffect(() => {
    form.reset({ name: props.data?.name });
  }, [props.data]);
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="formEdit"
          onSubmit={handleEdit}
          data={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Input category',
              label: 'Category'
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
          <Button type="submit" form="formEdit" loading={status == 'pending'}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditCategory;
