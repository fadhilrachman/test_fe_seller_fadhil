'use client';
import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import { useListDivision } from '@/hooks/useDivision';
import { useListEmployee } from '@/hooks/useEmployee';
import React, { useEffect, useRef } from 'react';
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
import PdfViewer from './pdf-viewer/pdf-viewer';
import ExcelPage from './excel-page';
import * as XLSX from 'xlsx';
import {
  ENTRY_STATUS_ATTENDANCE,
  LEAVE_STATUS_ATTENDANCE,
  STATUS
} from '@/lib/constants';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  const reportRef = useRef<HTMLDivElement>(null);
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

  const downloadExcel = () => {
    // await refetch();
    const dataAttendance = dataHistoryAttendance?.data || [];

    const worksheet = XLSX.utils.json_to_sheet(
      dataAttendance?.map((item) => ({
        Tanggal: moment(item.entry_time).format('YYYY-MM-DD'),
        'Nama Karyawan': item.user.name,
        Email: item.user.email,
        Profesi: item.user.job_title,
        'Status Masuk': ENTRY_STATUS_ATTENDANCE[item.entry_status].label,
        'Foto Masuk': item.entry_img,
        'Jam Masuk':
          item.entry_status != 'time_off'
            ? moment(item.entry_time).format('HH:mm')
            : '',
        'Status Pulang': LEAVE_STATUS_ATTENDANCE[item.leave_status].label,
        'Foto Pulang': item.leave_img,
        'Jam Pulang':
          item.leave_status != 'time_off'
            ? moment(item.leave_time).format('HH:mm')
            : ''
      }))
    );

    worksheet['!cols'] = [
      {
        wch: 20
      }
    ];
    // Membuat workbook dan menambahkan worksheet ke dalamnya
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Data Presensi ${moment().format('YYYY-MM-DD')}`
    );

    // Mengunduh file Excel
    XLSX.writeFile(workbook, `${moment().format('YYYY-MM-DD')}_data_cuti.xlsx`);
  };

  const generatePdf = () => {
    const input = reportRef.current;
    if (!input) return; // Make sure the ref exists

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report_karyawan.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };

  useEffect(() => {
    refetch();
  }, [form.watch('division')]);
  return (
    <div className="space-y-4">
      <div className="flex w-full items-end justify-between ">
        {
          <FormGenerator
            className=""
            form={form}
            data={[
              {
                label: 'Tanggal Mulai',
                name: 'start_date',
                grid: 3,
                type: 'date'
              },
              {
                label: 'Tanggal Berakhir',
                name: 'end_date',
                grid: 3,
                type: 'date'
              },
              {
                label: 'Divisi',
                name: 'division',
                grid: 3,
                type: 'comobox',
                options: optionsDivision || []
              },
              {
                label: 'Nama Karyawan',
                name: 'employee',
                loading: isFetchingEmployee,
                grid: 3,
                type: 'comobox',
                options: optionsEmployee || []
              }
            ]}
            id="form"
            onSubmit={(val) => {
              console.log({ val });

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
          <div className="flex space-x-2">
            <Button
              size={'sm'}
              disabled={
                !isFetchedHistoryAttendance &&
                !isFetchedShifting &&
                !isFetchedTimeOff
              }
              variant={'secondary'}
              onClick={generatePdf}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button
              size={'sm'}
              disabled={
                !isFetchedHistoryAttendance &&
                !isFetchedShifting &&
                !isFetchedTimeOff
              }
              variant={'secondary'}
              onClick={downloadExcel}
            >
              <Download className="mr-2 h-4 w-4" /> Download Excel
            </Button>
          </div>
        </div>
        {isFetchedHistoryAttendance && isFetchedShifting && isFetchedTimeOff ? (
          <>
            {' '}
            <TabsContent value="account" className="!w-full">
              <PdfViewer
                dataShifting={dataShifting?.data || []}
                reportRef={reportRef}
                startDate={form.getValues('start_date')}
                endDate={form.getValues('end_date')}
              />
            </TabsContent>{' '}
            <TabsContent value="password">
              <ExcelPage
                dataAttendance={dataHistoryAttendance?.data || []}
                downloadExcel={downloadExcel}
              />
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
