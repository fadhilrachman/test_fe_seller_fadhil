import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useListMasterShifting } from '@/hooks/common.hook';
import { useCreateMasterShifting } from '@/hooks/master-shifting.hooks';
import { useCreateShifting, useUpdateShifting } from '@/hooks/shifting.hook';
import { useCreateDivision } from '@/hooks/useDivision';
import { useListEmployee } from '@/hooks/useEmployee';
import { CreateMasterShiftingType } from '@/types/master-shifting.type';
import { CreateShiftingType, ShiftingType } from '@/types/shifting.type';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
interface Props {
  typeForm: 'update' | 'create';
  isOpen: boolean;
  onClose: () => void;
  data?: ShiftingType;
}

type FormData = z.infer<typeof CreateShiftingType>;

export function FormShifting(props: Props) {
  const { mutate: mutateCreate, status: statusCreate } = useCreateShifting();
  const { mutate: mutateUpdate, status: statusUpdate } = useUpdateShifting(
    props?.data?.id || ''
  );
  const { options } = useListMasterShifting({ page: 1, per_page: 1000 });

  const { options: optionsEmployee, refetch } = useListEmployee({
    page: 1,
    per_page: 1000
  });
  console.log({ data: props.data });

  const listConditionForm = {
    title: {
      create: 'Tambah',
      update: 'Edit'
    },
    status: {
      create: statusCreate,
      update: statusUpdate
    },
    mutate: {
      create: mutateCreate,
      update: mutateUpdate
    }
  };

  const form = useForm<FormData>({
    // resolver: zodResolver(CreateMasterShiftingType)
  });

  useEffect(() => {
    if (props.typeForm == 'update') {
      form.setValue(
        'master_shifting_code',
        props.data?.master_shifting.code || ''
      );
      form.setValue('user_id', props.data?.user.id || '');
      form.setValue(
        'shifting_date_start',
        moment(props.data?.shifting_date_start).format('YYYY-MM-DD') || ''
      );
      form.setValue(
        'shifting_date_end',
        moment(props.data?.shifting_date_end).format('YYYY-MM-DD') || ''
      );
    }
  }, [props.data]);

  useEffect(() => {
    if (listConditionForm.status[props.typeForm] == 'success') {
      form.reset();
      props.onClose();
    }
  }, [listConditionForm.status[props.typeForm]]);
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {listConditionForm.title[props.typeForm]} Shifting
          </DialogTitle>
          <DialogDescription>
            Tentukan Waktu dan Shifting Karyawan
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={listConditionForm.mutate[props.typeForm]}
          data={[
            {
              name: 'user_id',
              type: 'comobox',
              placeholder: 'Pilih Karyawan',
              label: 'Karyawan',
              options: optionsEmployee
            },
            {
              name: 'master_shifting_code',
              type: 'comobox',
              placeholder: 'Pilih Shifting',
              label: 'Shifting',
              options: options
            },

            {
              name: 'shifting_date_start',
              placeholder: '17:00',
              type: 'date',
              grid: 6,
              label: 'Tanggal Mulai'
            },
            {
              name: 'shifting_date_end',
              grid: 6,
              type: 'date',
              placeholder: '',
              label: 'Tanggal Berakhir'
            }
          ]}
        />
        <DialogFooter>
          <Button type="button" onClick={props.onClose} variant={'ghost'}>
            Kembali
          </Button>
          <Button
            type="submit"
            form="form"
            loading={listConditionForm.status[props.typeForm] == 'pending'}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
