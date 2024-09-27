import BaseImage from '@/components/base-image';
import BaseInputSearch from '@/components/base-input-search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useListAnnouncement } from '@/hooks/announcement.hook';
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  Edit,
  MoreHorizontal,
  Radio,
  Trash,
  UserIcon
} from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListAnnouncementType } from '@/types/announcement.type';
import { FormAnnouncement } from './form-announcement';
const ListAnnouncement = () => {
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { data, refetch, isFetching } =
    useListAnnouncement(paginationAndSearch);
  const [dialog, setDialog] = useState({ update: false, delete: false });
  const [selectData, setSelectData] = useState<ListAnnouncementType>();
  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);
  return (
    <div className="space-y-4">
      <BaseInputSearch placeholder="Cari Pengumuman" onChange={handleSearch} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((announcement) => (
          <Card
            key={announcement.id}
            className="flex cursor-pointer flex-col overflow-hidden transition-all  "
          >
            <div className="relative flex-grow">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <CardContent className="pt-6">
                {announcement.image && (
                  <div className="mb-4 overflow-hidden rounded-md">
                    <BaseImage
                      src={announcement.image}
                      alt="Announcement image"
                      width={400}
                      height={200}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <p className="line-clamp-3 text-sm font-semibold text-gray-800">
                    {announcement.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div className=" flex items-center space-x-2">
                      {' '}
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={announcement.user.avatar}
                          alt={announcement.user.name}
                        />
                        <AvatarFallback>
                          <UserIcon className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium text-gray-700">
                          {announcement.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {announcement.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <BriefcaseIcon className="mr-1 h-3 w-3" />
                      <span>
                        {announcement.user.job_title || 'Human Recource'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-1 flex items-center text-xs text-gray-600">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>
                      Dibuat:{' '}
                      {moment(announcement.created_at).format('YYYY/MM/DD')}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <ClockIcon className="mr-1 h-3 w-3" />
                    <span>
                      Ditampilkan sampai:{' '}
                      {moment(announcement.expired_date).format('YYYY/MM/DD')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
            <CardFooter className="flex items-center justify-between bg-gray-50 pt-4">
              <div className="flex items-center gap-x-2 text-sm">
                <Radio className="animate-pulse text-primary" />
                <span>Sedang Ditampilkan</span>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="top">
                  <DropdownMenuLabel>Aksi</DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectData(announcement);
                      setDialog((p) => ({ ...p, update: true }));
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Pengumuman
            </Badge> */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <FormAnnouncement
        isOpen={dialog.update}
        onClose={() => {
          setDialog((p) => ({ ...p, update: false }));
        }}
        typeForm="update"
        data={selectData}
      />
    </div>
  );
};

export default ListAnnouncement;
