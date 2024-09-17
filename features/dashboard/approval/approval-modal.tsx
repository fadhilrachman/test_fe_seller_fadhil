import FormGenerator from '@/components/form-generator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateDivision } from '@/hooks/useDivision';
import { ApprovalType } from '@/types/approval';
import { CreateDivisionSchema } from '@/types/division';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ApprovalType;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function ApprovalModal(props: Props) {
  const { data } = props;
  const { mutate, status } = useCreateDivision();

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Setujui Perizinan</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm">
          <div className="flex">
            <p className="w-[180px] font-light">Nama Karyawan</p>
            <p className="ml-2">: Fadhil</p>
          </div>
          <div className="flex">
            <p className="w-[180px] font-light">Tanggal</p>
            <p className="ml-2">
              : {moment(data.start_date).format('DD MMMM')} -{' '}
              {moment(data.end_date).format('DD MMMM')}
            </p>
          </div>
          <div className="mb-4 flex items-center space-x-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-xs font-light ">Nama Karyawan</span>
              <p className="font-medium">{data.user.name}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xs font-light ">Tanggal</p>
            <p className="font-medium "></p>
          </div>
          <div></div>
          <label>Berikan tanggapan anda disini</label>
          <Textarea />
        </div>
        <DialogFooter>
          <Button type="submit" form="form" loading={status == 'pending'}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
