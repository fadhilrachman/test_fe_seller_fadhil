'use client';
import FormGenerator, {
  DataFormType
} from '@/components/shared/form-generator';
import Title from '@/components/shared/title';
import { Button } from '@/components/ui/button';
import { usePostCreateArticle } from '@/hooks/article.hook';
import { useGetCategory } from '@/hooks/category.hook';
import { ArticleType, CreateArticleType } from '@/types/article.type';
import { ArrowLeft, Backpack } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PreviewArticle from './preview-article';

const CreateArticle = () => {
  const [dialog, setDialog] = useState({ preview: false });
  const router = useRouter();
  const form = useForm({});
  const { data } = useGetCategory({ page: 1, per_page: 1000 });
  const { mutateAsync, status } = usePostCreateArticle();
  const optionsCategory = data?.result?.map((val) => ({
    id: val?.id,
    label: val?.name
  }));

  const handleCreate = async (val: CreateArticleType) => {
    try {
      await mutateAsync(val);
      router.push('/admin/article');
    } catch (error) {
      console.log({ error });
    }
  };

  const dataForm: DataFormType[] = [
    {
      name: 'thumbnail',
      type: 'file',
      label: 'Thumbnails',
      validation: {
        required: {
          value: true,
          message: 'Please enter picture'
        }
      }
    },
    {
      name: 'title',
      type: 'text',
      placeholder: 'Input title',
      label: 'Title',
      validation: {
        required: {
          value: true,
          message: 'Please enter title'
        }
      }
    },
    {
      name: 'category_id',
      type: 'select',
      placeholder: 'Select category',
      label: 'Category',
      options: optionsCategory || [],
      validation: {
        required: {
          value: true,
          message: 'Please enter category'
        }
      }
    },
    {
      name: 'content',
      type: 'reactQuill',
      placeholder: 'Type a content...',
      validation: {
        required: {
          value: true,
          message: 'Content field cannot be empty'
        }
      }
    }
  ];
  return (
    <div className="space-y-8 rounded-lg border bg-gray-50 p-4">
      <Title title="Create Articles" />
      <div className="space-y-4">
        <FormGenerator
          form={form}
          id="formCreate"
          onSubmit={handleCreate}
          data={dataForm}
        />
        <div className="flex justify-end space-x-3">
          <Button
            onClick={() => {
              form.reset({
                title: '',
                content: '',
                thumbnail: '',
                category_id: ''
              });
            }}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setDialog((p) => ({ ...p, preview: true }));
            }}
            variant={'ghost'}
            className="bg-slate-200"
          >
            Preview
          </Button>
          <Button type="submit" form="formCreate" loading={status == 'pending'}>
            Upload
          </Button>
        </div>
      </div>

      <PreviewArticle
        data={form.watch() as ArticleType}
        isOpen={dialog.preview}
        onClose={() => {
          setDialog((p) => ({ ...p, preview: false }));
        }}
      />
    </div>
  );
};

export default CreateArticle;
