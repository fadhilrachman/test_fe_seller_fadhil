'use client';
import BaseInputSearch from '@/components/shared/base-input-search';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import BaseTable from '@/components/shared/base-table';
import { ColumnDef } from '@tanstack/react-table';
import DeleteDialog from '@/components/shared/delete-dialog';
import { useRouter } from 'next/navigation';
import { useDeleteArticle, useGetArticle } from '@/hooks/article.hook';
import BasePagination from '@/components/shared/base-pagination';
import { ArticleType } from '@/types/article.type';
import { useGetCategory } from '@/hooks/category.hook';
import PreviewArticle from './preview-article';

const TableArticle = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 10,
    category_id: ''
  });
  const [selectedData, setSelectedData] = useState<ArticleType>();
  const [dialog, setDialog] = useState({
    delete: false,
    preview: false
  });
  const {
    data,
    isFetching,
    refetch,
    status: statusGet
  } = useGetArticle(params);
  const { data: dataCategory } = useGetCategory({
    page: 1,
    per_page: 1000
  });
  const { mutateAsync, status } = useDeleteArticle();

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: selectedData?.id || '' });
    } catch (error) {
      console.log({ error });
    } finally {
      setDialog((p) => ({ ...p, delete: false }));
    }
  };

  const columns: ColumnDef<ArticleType>[] = [
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <img
              src={row?.original?.thumbnail || '/content1.jpg'}
              className="h-[60px] w-[60px] rounded-lg"
              alt=""
            />
          </div>
        );
      }
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        return <p className="mx-auto max-w-[200px]">{row?.original?.title}</p>;
      }
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        return <>{row?.original?.category?.name}</>;
      }
    },
    {
      accessorKey: 'created_at',
      header: 'Created At'
    },
    {
      accessorKey: '',
      header: 'Action',
      cell: ({ row }) => (
        <div>
          <Button
            onClick={() => {
              setSelectedData(row?.original);

              setDialog((p) => ({ ...p, preview: true }));
            }}
            variant={'link'}
            className="underline"
          >
            Preview
          </Button>
          <Button
            onClick={() => {
              router.push(`/admin/article/${row?.original?.id}`);
            }}
            variant={'link'}
            className="underline"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setSelectedData(row?.original);
              setDialog((p) => ({ ...p, delete: true }));
            }}
            variant={'link'}
            className="text-red-500 underline"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    refetch();
  }, [params]);
  return (
    <div className="rounded-lg border bg-gray-50 ">
      <div className="border-b p-4">
        <p>Total Articles : {data?.pagination?.total_data}</p>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 p-4 md:flex-row">
        <div className="flex space-x-2">
          <Select
            onValueChange={(e) => {
              console.log({ e });
              setParams((p) => ({ ...p, category_id: e }));
            }}
          >
            <SelectTrigger className=" w-max  bg-white text-black">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              {dataCategory?.result?.map((val, key) => {
                return (
                  <SelectItem value={val.id} key={key}>
                    {val.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <BaseInputSearch
            onChange={(e) => {
              setParams((p) => ({ ...p, search: e }));
            }}
            placeholder="Search by title "
          />
        </div>
        <Button
          className="w-full md:w-max"
          onClick={() => {
            router.push('/admin/article/add');
          }}
        >
          <Plus />
          Add Article
        </Button>
      </div>
      <div className="space-y-4 pb-4">
        <BaseTable
          status={statusGet}
          columns={columns}
          data={data?.result || []}
          loading={isFetching}
          refetch={refetch}
        />{' '}
        <BasePagination
          currentPage={params.page}
          totalPages={data?.pagination.total_page as number}
          onPageChange={(page) => setParams((p) => ({ ...p, page }))}
          totalItems={data?.pagination.total_data as number}
        />
      </div>
      {/* ////////////// */}
      {/* DIALOG */}
      {/* ////////////// */}

      <DeleteDialog
        title="Article"
        description={`Delete article “${selectedData?.title}”? This will remove it from master data permanently`}
        onDelete={handleDelete}
        isOpen={dialog.delete}
        loading={status == 'pending'}
        onClose={() => {
          setDialog((p) => ({ ...p, delete: false }));
        }}
      />

      <PreviewArticle
        data={selectedData as ArticleType}
        isOpen={dialog.preview}
        onClose={() => {
          setDialog((p) => ({ ...p, preview: false }));
        }}
      />
    </div>
  );
};

export default TableArticle;
