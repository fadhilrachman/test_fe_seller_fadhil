import FormGenerator, { DataFormType } from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useCreateTimeOff, useUpdateTimeOff } from '@/hooks/time-off.hook';
import { useListEmployee } from '@/hooks/useEmployee';
import { CreateTimeOffType, TimeOffType } from '@/types/time-off.type';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: TimeOffType;
  typeForm: 'update' | 'create';
}

type FormData = z.infer<typeof CreateTimeOffType>;

export function FormTimeOff(props: Props) {
  const { mutate: mutateCreate, status: statusCreate } = useCreateTimeOff();
  const { mutate: mutateUpdate, status: statusUpdate } = useUpdateTimeOff(
    props?.data?.id || ''
  );
  const { data: dataEmployee } = useListEmployee({ page: 1, per_page: 1000 });
  const optionsEmployee = dataEmployee?.data.map((val) => ({
    id: val.id,
    label: val.name
  }));
  const form = useForm<FormData>({
    resolver: zodResolver(CreateTimeOffType)
  });

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

  const dataForm: DataFormType[] = [
    {
      name: 'user_id',
      type: 'comobox',
      placeholder: 'Pilih Karyawan',
      label: 'Karyawan',
      options: optionsEmployee
    },
    {
      name: 'type',
      type: 'select',
      placeholder: 'Pilih Tipe Cuti',
      label: 'Tipe Cuti',
      options: [
        {
          id: 'yearly',
          label: 'Tahunan'
        },
        {
          id: 'give_birth',
          label: 'Melahirkan'
        },
        {
          id: 'death',
          label: 'Kematian'
        },
        {
          id: 'hajj_pilgrimage',
          label: 'Haji'
        }
      ]
    },
    {
      name: 'start_date',
      placeholder: '17:00',
      type: 'date',
      label: 'Tanggal Mulai',
      grid: 6
    },
    {
      name: 'end_date',
      type: 'date',
      placeholder: '',
      label: 'Tanggal Berakhir',
      grid: 6
    },

    {
      name: 'description',
      type: 'textarea',
      placeholder: '',
      label: 'Deskripsi'
    }
  ];

  useEffect(() => {
    if (props.typeForm == 'update') {
      form.setValue('description', props.data?.description || '');
      form.setValue('user_id', props.data?.user.id || '');
      form.setValue('type', props.data?.type || '');
      form.setValue(
        'start_date',
        moment(props.data?.start_date).format('YYYY-MM-DD') || ''
      );
      form.setValue(
        'end_date',
        moment(props.data?.end_date).format('YYYY-MM-DD') || ''
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
            {' '}
            {listConditionForm.title[props.typeForm]} Cuti
          </DialogTitle>
          <DialogDescription>
            Tambahkan Cuti Langsung untuk Karyawan
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={listConditionForm.mutate[props.typeForm]}
          data={dataForm}
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
