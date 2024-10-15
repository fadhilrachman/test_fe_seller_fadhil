'use client';
import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import { useListDivision } from '@/hooks/useDivision';
import { useListEmployee } from '@/hooks/useEmployee';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer
} from '@react-pdf/renderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Sheet } from 'lucide-react';
import { useListTimeOff } from '@/hooks/time-off.hook';
import { useListHistoryAttendance } from '@/hooks/history-attendance.hook';
import { useListShifting } from '@/hooks/shifting.hook';
import BeforeGenerate from './beforeGenerate';
import PdfViewer from './pdf-viewer';
import ExcelPage from './excel-page';

// Create styles
const styles = StyleSheet.create({
  page: {
    // backgroundColor: '#d11fb6',
    color: 'black'
  },
  section: {
    margin: 10,
    padding: 10
  },
  viewer: {
    width: '100%', //the pdf viewer will take up all of the width and height
    height: window.innerHeight
  }
});

const ListReport = () => {
  const form = useForm();
  const {
    options: optionsDivision,
    isFetching: isFetchingDivision,
    refetch: refetchDivision
  } = useListDivision({
    page: 1,
    per_page: 1000,
    division_id: form.watch('division')
  });
  const {
    options: optionsEmployee,
    isFetching: isFetchingEmployee,
    refetch
  } = useListEmployee({
    page: 1,
    per_page: 1000
  });
  //////////////////////////////
  // FETCHING DATA" FOR DOWNLOAD
  //////////////////////////////
  const {
    isFetching: isFetchingTimeOff,
    refetch: refetchTimeOff,
    isFetched: isFetchedTimeOff
  } = useListTimeOff({
    page: 1,
    per_page: 1000,
    division_id: form.watch('division'),
    enabled: false
  });
  const {
    data: dataHistoryAttendance,
    isFetching: isFetchingHistoryAttendance,
    isFetched: isFetchedHistoryAttendance,
    refetch: refetchHistoryAttendance
  } = useListHistoryAttendance({
    page: 1,
    per_page: 1000,
    division_id: form.watch('division'),
    enabled: false
  });
  const {
    data: dataShifting,
    isFetching: isFetchingShifting,
    isFetched: isFetchedShifting,

    refetch: refetchShifting
  } = useListShifting({
    page: 1,
    per_page: 1000,
    division_id: form.watch('division'),
    enabled: false
  });
  //////////////////////////////
  //////////////////////////////
  //////////////////////////////

  useEffect(() => {
    refetch();
  }, [form.watch('division')]);
  return (
    <div className="space-y-4">
      <div className="flex w-full items-end justify-between ">
        {
          <FormGenerator
            className="min-w-[500px]"
            form={form}
            data={[
              {
                label: 'Divisi',
                name: 'division',
                grid: 6,
                type: 'comobox',
                options: optionsDivision || []
              },
              {
                label: 'Nama Karyawan',
                name: 'employee',
                loading: isFetchingEmployee,
                grid: 6,
                type: 'comobox',
                options: optionsEmployee || []
              }
            ]}
            id="form"
            onSubmit={() => {
              refetchHistoryAttendance();
              refetchShifting();
              refetchTimeOff();
            }}
          />
        }
        <Button
          type="submit"
          form="form"
          loading={
            isFetchingHistoryAttendance &&
            isFetchingShifting &&
            isFetchingTimeOff
          }
        >
          Generate
        </Button>
      </div>
      <Tabs defaultValue="account" className="!mt-8">
        <div className="flex w-full justify-between ">
          <TabsList>
            <TabsTrigger value="account">
              <FileText className="mr-2 h-4 w-4" /> Pdf
            </TabsTrigger>
            <TabsTrigger value="password">
              <Sheet className="mr-2 h-4 w-4" /> Excel
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-col items-end">
            <Button size={'sm'} variant={'secondary'}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <p className="text-xs text-neutral-500">Download excel dan pdf</p>
          </div>
        </div>
        {isFetchedHistoryAttendance && isFetchedShifting && isFetchedTimeOff ? (
          <>
            {' '}
            <TabsContent value="account" className="!w-full">
              <PdfViewer dataShifting={dataShifting?.data || []} />
            </TabsContent>{' '}
            <TabsContent value="password">
              <ExcelPage dataAttendance={dataHistoryAttendance?.data || []} />
            </TabsContent>
          </>
        ) : (
          <BeforeGenerate />
        )}
      </Tabs>
    </div>
  );
};

export default ListReport;
