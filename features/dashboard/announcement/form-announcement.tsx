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
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  useCreateAnnouncement,
  useUpdateAnnouncement
} from '@/hooks/announcement.hook';
import {
  CreateAnnouncementType,
  ListAnnouncementType
} from '@/types/announcement.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ListAnnouncementType;
  typeForm: 'create' | 'update';
}

type FormData = z.infer<typeof CreateAnnouncementType>;

export function FormAnnouncement(props: Props) {
  const { data, typeForm } = props;
  const { mutate: mutateCreate, status: statusCreate } =
    useCreateAnnouncement();
  const { mutate: mutateUpdate, status: statusUpdate } = useUpdateAnnouncement(
    data?.id || ''
  );

  const listConditionForm = {
    title: {
      create: 'Buat',
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
    resolver: zodResolver(CreateAnnouncementType)
  });

  useEffect(() => {
    if (listConditionForm.status[typeForm] == 'success') {
      form.reset();
      props.onClose();
    }
  }, [listConditionForm.status[typeForm]]);

  useEffect(() => {
    if (typeForm == 'update') {
      form.setValue('description', data?.description || '');
      form.setValue(
        'expired_date',
        moment(data?.expired_date).format('YYYY-MM-DD')
      );
      form.setValue('image', data?.image || '');
    }
  }, [data]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {listConditionForm.title[typeForm]} Pengumuman
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={listConditionForm.mutate[typeForm]}
          grid="1"
          data={[
            {
              name: 'description',
              type: 'textarea',
              placeholder: 'Tulis pengumuman disini',
              label: 'Deskripsi'
            },
            {
              name: 'expired_date',
              type: 'date',
              placeholder: 'Tulis pengumuman disini',
              label: (
                <div className="flex space-x-2">
                  <span>Tampilkan hingga tanggal</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleAlert className="h-4 w-4 text-primary" />
                      </TooltipTrigger>
                      <TooltipContent className="w-[230px]">
                        <p>
                          Pengumuman akan ditampilkan sampai tanggal yg telah di
                          tentukan
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )
            },
            {
              name: 'image',
              type: 'upload',
              placeholder: '17:00',
              label: 'Upload Gambar'
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
            loading={listConditionForm.status[typeForm] == 'pending'}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
