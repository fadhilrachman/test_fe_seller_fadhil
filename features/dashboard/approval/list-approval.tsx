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
import { Download, Eye, Filter, Plus, X } from 'lucide-react';
import { FilterApproval } from './filter-approval';
import BaseInputSearch from '@/components/base-input-search';
import SkeletonApproval from './skeleton-approval';

const ListApproval = () => {
  const IconFeedback = Icons['feedback'];
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    search: ''
  });
  const [filter, setFilter] = useState({
    approval_type: { id: '', label: '' },
    division_id: { id: '', label: '' }
  });
  const [dialog, setDialog] = useState({ approval: false, filter: false });
  const [selectData, setSelectData] = useState<ApprovalType>();
  const IconFile = Icons['file'];
  const searchParams = useSearchParams();
  const status = searchParams.get('tabs') || 'waiting_approval';
  const { data, refetch, isFetching } = useListApproval({
    status,
    ...paginationAndSearch,
    division_id: filter.division_id.id,
    approval_type: filter.approval_type.id
  });
  const approvalType = {
    attendance: 'Izin Sakit',
    shifting: 'Shifting',
    time_off: 'Cuti'
  };
  const handleOpenCloseDialog = (params: keyof typeof dialog) => {
    setDialog((p) => ({ ...p, [params]: !p[params] }));
  };

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  console.log({ filter });

  useEffect(() => {
    refetch();
  }, [status, paginationAndSearch, filter]);

  return (
    <div className="space-y-4">
      {/* <div className="w-[100px] border bg-gray-400">cuyy</div> */}
      <div className="flex justify-between space-x-2">
        <div className="flex space-x-2">
          <FilterApproval
            paramsFilter={filter}
            dataFormFilter={[
              {
                name: 'approval_type',
                placeholder: 'Tipe Perizinan',
                label: 'Tipe Perizinan',
                // helperText: 'this is data bla bla',
                type: 'select',
                options: [
                  { label: 'Cuti', id: 'time_off' },
                  { label: 'Shifting', id: 'shifting' },
                  { label: 'Absen', id: 'attendance' }
                ]
              },
              {
                name: 'division_id',
                placeholder: 'Divisi',
                label: 'Divisi',
                helperText: 'this is data bla bla',
                type: 'select',
                options: [
                  { label: 'The Godfather', id: '1' },
                  { label: 'Pulp Fiction', id: '2' }
                ]
              }
            ]}
            setParamsFilter={setFilter}
          />
          <BaseInputSearch
            placeholder="Cari Karyawan"
            onChange={handleSearch}
          />
        </div>
        {/* <p className="text-sm text-gray-400">Filter By</p> */}

        <div className="flex items-start space-x-2">
          <Button>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      {/* <ListFilter /> */}

      {isFetching ? (
        <SkeletonApproval />
      ) : data?.data.length == 0 ? (
        <div className="flex h-[200px] items-center justify-center">
          Tidak ada data
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {data?.data.map((val: ApprovalType, index: number) => {
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
              <Card key={index} className="overflow-hidden">
                <div className="relative flex-grow">
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    #97120398{' '}
                    <Badge variant={'secondary'}>
                      {approvalType[val.approval_type]}
                    </Badge>
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
                    onClick={() => {
                      setSelectData(val);
                      handleOpenCloseDialog('approval');
                    }}
                  >
                    {val.status == 'waiting_approval' ? (
                      <>
                        {' '}
                        <IconFeedback className=" mr-[4px] h-4" />
                        Beri Tanggapan
                      </>
                    ) : (
                      <>
                        {' '}
                        <Eye className=" mr-[4px] h-4" />
                        Lihat Detail
                      </>
                    )}
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
