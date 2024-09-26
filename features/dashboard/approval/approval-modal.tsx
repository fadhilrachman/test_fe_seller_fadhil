import FormGenerator from '@/components/form-generator';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { useApproval } from '@/hooks/approval';
import { useCreateDivision } from '@/hooks/useDivision';
import { ApprovalActionType, ApprovalType } from '@/types/approval';
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
  const { mutate, status } = useApproval(data.id);
  const [approvedClick, setApprovedClick] = useState<'approve' | 'reject'>();
  const [feedbackDescription, setFeedbackDescription] = useState<string>(
    data.feedback_description || ''
  );
  const IconFile = Icons['file'];
  const IconX = Icons['close'];
  const IconCheckList = Icons['check'];

  const approvalType = {
    attendance: 'Absen',
    shifting: 'Shifting',
    time_off: 'Cuti'
  };

  const handleApproval = (approval: typeof approvedClick) => {
    console.log({
      feedback_description: feedbackDescription,
      status: approval
    });

    mutate({
      feedback_description: feedbackDescription,
      status: approval as 'approve' | 'reject'
    });
  };

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
      // setApprovedClick(undefined);
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Setujui Perizinan</DialogTitle>
          <DialogDescription>
            Periksa detail berikut, lalu pilih 'Setujui' atau 'Tolak'.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Nama Karyawan</p>
            <div className=" flex items-center justify-center gap-x-2 ">
              :{' '}
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {data.user.name}
              <small>({data.user.email})</small>
            </div>
          </div>
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Pekerjaan</p>
            <p className="">: {data.user.job_title || '-'}</p>
          </div>
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Divisi</p>
            <p className="">: {data.user.division?.name || '-'}</p>
          </div>
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Tipe Approval</p>
            <div className="">
              : <Badge>{approvalType[data.approval_type]}</Badge>
            </div>
          </div>
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Tanggal</p>
            <p className="">
              : {moment(data.start_date).format('DD MMMM YYYY')} -{' '}
              {moment(data.end_date).format('DD MMMM YYYY')}
            </p>
          </div>
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Dokumen Pendukung</p>
            <div className=" flex">
              :
              <div className="flex items-center text-sm font-medium text-blue-500">
                <IconFile className="h-3" />
                <span>document.jpg</span>
              </div>
            </div>
          </div>
          <div className="flex items-center border-b pb-3 pt-1">
            <p className="w-[180px] font-light">Deskripsi</p>
            <p className="">: {data.description || '-'}</p>
          </div>
        </div>
        <label>
          Berikan tanggapan anda disini{' '}
          <small className="text-gray-500">(optional)</small>
        </label>
        <Textarea
          value={feedbackDescription}
          readOnly={data.status != 'waiting_approval'}
          onChange={(e) => {
            setFeedbackDescription(e.target.value);
          }}
          placeholder="Tuliskan tanggapan atau catatan Anda di sini"
        />
        <DialogFooter>
          <Button
            type="submit"
            form="form"
            variant={'ghost'}
            onClick={props.onClose}
          >
            Kembali
          </Button>
          {data.status == 'waiting_approval' && (
            <>
              {' '}
              <Button
                variant={'destructive'}
                size={'sm'}
                loading={approvedClick == 'reject' && status == 'pending'}
                onClick={() => {
                  setApprovedClick('reject');
                  handleApproval('reject');
                }}
              >
                {/* {Icon}
                 */}
                <IconX className=" mr-[4px] h-4" />
                Tolak
              </Button>
              <Button
                onClick={() => {
                  setApprovedClick('approve');
                  handleApproval('approve');
                }}
                variant="approved"
                size={'sm'}
                loading={approvedClick == 'approve' && status == 'pending'}
              >
                <IconCheckList className=" mr-[4px] h-4" />
                Setujui
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
