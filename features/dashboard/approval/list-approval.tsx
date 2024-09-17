'use client';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useListApproval } from '@/hooks/approval';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ApprovalModal } from './approval-modal';
import { ApprovalType } from '@/types/approval';

const ListApproval = () => {
  const IconX = Icons['close'];
  const [dialog, setDialog] = useState({ approval: false });
  const [selectData, setSelectData] = useState<ApprovalType>();
  const IconCheckList = Icons['check'];
  const IconFile = Icons['file'];
  const searchParams = useSearchParams();
  const status = searchParams.get('tabs') || 'waiting_approval';
  const { data, refetch } = useListApproval({ status });

  const handleOpenCloseDialog = (params: keyof typeof dialog) => {
    setDialog((p) => ({ ...p, [params]: !p[params] }));
  };

  useEffect(() => {
    refetch();
  }, [status]);

  return (
    <div className="space-y-4">
      <div className="w-[180px] border">cuyy</div>
      <div>
        <Input
          placeholder={`Search Employee...`}
          className="w-full md:max-w-sm"
        />
      </div>
      {data?.data.length == 0 ? (
        <div className="flex h-[200px] items-center justify-center">
          Tidak ada data
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {data?.data.map((val: any, index: number) => {
            const status = {
              waiting_approval: 'Menunggu',
              approved: 'Disetujui',
              rejected: 'Ditolak'
            };
            const statusColor = {
              waiting_approval: 'waiting',
              approved: 'approved',
              rejected: 'destructive'
            };
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    #97120398 <Badge>Absen</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className=" grid gap-x-6 text-sm lg:grid-cols-2">
                    <div className="mb-4 flex items-center space-x-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-xs font-light ">
                          Nama Karyawan
                        </span>
                        <p className="font-medium">{val.user.name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-light ">Status</p>
                      <Badge
                        variant={
                          statusColor[
                            val?.status as keyof typeof statusColor
                          ] as
                            | 'approved'
                            | 'default'
                            | 'secondary'
                            | 'destructive'
                            | 'waiting'
                            | 'outline'
                        }
                      >
                        {status[val?.status as keyof typeof status]}
                      </Badge>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-light ">Tanggal</p>
                      <p className="font-medium ">
                        {moment(val.start_date).format('DD MMMM')} -{' '}
                        {moment(val.end_date).format('DD MMMM')}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs font-light ">Dokumen Pendukung</p>
                      {val.supporting_document ? (
                        <div className="flex items-center text-sm font-medium text-blue-500">
                          <IconFile className="h-3" />
                          <span>document.jpg</span>
                        </div>
                      ) : (
                        '-'
                      )}
                    </div>
                  </div>
                  <div className="">
                    <p className="text-xs font-light ">Deskripsi</p>
                    {val.description ? (
                      <p className="text-sm ">{val.description} </p>
                    ) : (
                      '-'
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex w-full gap-x-4">
                  <Button
                    className="w-full"
                    variant={'destructive'}
                    size={'sm'}
                    onClick={() => {
                      setSelectData(val);
                      handleOpenCloseDialog('approval');
                    }}
                  >
                    {/* {Icon}
                     */}
                    <IconX className=" mr-[4px] h-5" />
                    Reject
                  </Button>
                  <Button
                    className="w-full "
                    onClick={() => {
                      setSelectData(val);
                      handleOpenCloseDialog('approval');
                    }}
                    variant="approved"
                    size={'sm'}
                  >
                    <IconCheckList className=" mr-[4px] h-5" />
                    Approve
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
      {dialog.approval && (
        <ApprovalModal
          isOpen={dialog.approval}
          data={selectData as ApprovalType}
          onClose={() => {
            handleOpenCloseDialog('approval');
          }}
        />
      )}
    </div>
  );
};

export default ListApproval;
