'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import FormGenerator from '@/components/form-generator';
import { ProductForm } from '@/components/forms/product-form';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { useForm } from 'react-hook-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' },
  { title: 'Create', link: '/dashboard/employee/create' }
];

export default function Page() {
  const form = useForm();
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <FormGenerator
          form={form}
          id="form"
          onSubmit={(val) => {
            console.log({ val });
          }}
          data={[
            {
              label: 'Personal Information',
              name: '',
              type: 'title'
            },
            {
              type: 'text',
              name: 'cuy',
              label: 'Nama',
              placeholder: 'nama',
              grid: 3
            },

            {
              type: 'select',
              name: 'Status',
              options: [
                {
                  id: '1',
                  label: 'Verifying Payment'
                },
                {
                  id: '2',
                  label: 'Rejected Payment'
                },
                {
                  id: '3',
                  label: 'Approved Payment'
                },
                {
                  id: '4',
                  label: 'Verifying Payment'
                }
              ],
              label: 'Nama',
              placeholder: 'Select Status'
            },
            {
              type: 'textarea',
              name: 'cusy',
              label: 'Name',
              placeholder: 'Select Status'
            }
          ]}
        />
        <Button type="submit" form="form">
          Submit
        </Button>
        {/* <ProductForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={null}
          key={null}
        /> */}
      </div>
    </ScrollArea>
  );
}
