'use client';

import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaGraph } from '@/components/charts/area-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useDashboardAttendance,
  useDashboardShifting
} from '@/hooks/dashboard.hooks';
import { DivisionType } from '@/types/division';
import { BaseResponseShowDto } from '@/types';
import { User2 } from 'lucide-react';
import moment from 'moment';
import { useListEmployee } from '@/hooks/useEmployee';
import { ChartConfig } from '@/components/ui/chart';
import FormGenerator from '@/components/form-generator';
import { useForm } from 'react-hook-form';
import TabDivisionInformation from './tab-division-information';
import TabAttendance from './tab-attendance';
import TabShifting from './tab-shifting';
import TabTimeOff from './tab-time-off';
import TabApproval from './tab-approval';

interface DetailDivisionProps {
  data: any;
  isFetching: boolean;
  divisionId: string;
}

const DetailDivision = ({
  data,
  isFetching,
  divisionId
}: DetailDivisionProps) => {
  const [year, setYear] = useState<string>(
    moment().locale('en').format('YYYY')
  );
  const [month, setMonth] = useState<string>(
    moment().locale('en').format('MMMM')
  );
  const form = useForm({
    defaultValues: {
      month,
      year
    }
  });
  const [dataPieChart, setDataPieChart] = useState<any[]>([]);
  const { data: dataAttendance, refetch: isFetchingAttendance } =
    useDashboardAttendance({
      division_id: divisionId,
      month,
      year
    });

  const { data: dataEmployee, isFetching: isFetchingEmployee } =
    useListEmployee({
      page: 1,
      per_page: 1000,
      division_id: divisionId
    });

  const { data: dataShifting, refetch: isFetchingShifting } =
    useDashboardShifting({
      division_id: divisionId,
      month,
      year
    });

  useEffect(() => {
    isFetchingAttendance();
    isFetchingShifting();
  }, [month, year]);

  useEffect(() => {
    setYear(form.watch('year'));
    setMonth(form.watch('month'));
  }, [form.watch('year'), form.watch('month')]);

  const dataKeys = [
    { key: 'sick', label: 'Sakit', colorVar: '--chart-1' },
    { key: 'on_time', label: 'Tepat Waktu', colorVar: '--chart-2' },
    { key: 'late', label: 'Terlambat', colorVar: '--chart-3' },
    { key: 'time_off', label: 'Cuti', colorVar: '--chart-4' }
  ];

  const tabItems = [
    {
      id: 1,
      name: 'informasi divisi',
      content: <TabDivisionInformation data={data?.data} />
    },
    {
      id: 2,
      name: 'Absensi',
      content: <TabAttendance divisionId={divisionId} />
    },
    {
      id: 3,
      name: 'Shifting',
      content: <TabShifting divisionId={divisionId} />
    },
    {
      id: 4,
      name: 'Cuti',
      content: <TabTimeOff divisionId={divisionId} />
    },
    {
      id: 5,
      name: 'Approval',
      content: <TabApproval divisionId={divisionId} />
    }
  ];

  useEffect(() => {
    if (dataShifting?.data) {
      const preparedData = dataShifting.data.map((item: any, index: number) => {
        return {
          name: item.name,
          value: item.count,
          fill: `hsl(var(--chart-${index + 3}))`
        };
      });

      setDataPieChart(preparedData);
    }
  }, [dataShifting]);

  const chartConfig = {
    visitors: {
      label: 'Visitors'
    },
    chrome: {
      label: 'Chrome',
      color: 'hsl(var(--chart-1))'
    },
    safari: {
      label: 'Safari',
      color: 'hsl(var(--chart-2))'
    },
    firefox: {
      label: 'Firefox',
      color: 'hsl(var(--chart-3))'
    },
    edge: {
      label: 'Edge',
      color: 'hsl(var(--chart-4))'
    },
    other: {
      label: 'Other',
      color: 'hsl(var(--chart-5))'
    }
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-4">
        <FormGenerator
          data={[
            {
              name: 'month',
              type: 'select',
              grid: 6,
              options: Array.from({ length: 12 }, (_, i) => {
                const fullMonth = moment()
                  .locale('id')
                  .subtract(i, 'month')
                  .format('MMMM');
                return {
                  id: moment().locale('en').subtract(i, 'month').format('MMMM'),
                  label: fullMonth
                };
              })
            },
            {
              name: 'year',
              type: 'select',
              grid: 6,
              options: Array.from({ length: 12 }, (_, i) => {
                const fullYear = moment()
                  .locale('id')
                  .subtract(i, 'year')
                  .format('YYYY');
                return {
                  id: fullYear,
                  label: fullYear
                };
              })
            }
          ]}
          form={form}
          onSubmit={() => {}}
          id="form"
        />
      </div>
      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-2 grid grid-rows-[auto,1fr] gap-5">
          {/* Card untuk Total Karyawan */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex w-full items-center justify-between text-sm font-medium">
                  Total Karyawan
                  <User2 />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dataEmployee?.data.length} Karyawan
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Komponen PieGraph */}
          <div className="row-span-1 h-full">
            <PieGraph
              title="Data Shifting"
              description="Data Shifting per Kategori"
              data={dataPieChart}
              dataKey="value" // Pastikan ini sesuai dengan kunci dalam preparedData
              nameKey="name" // Pastikan ini sesuai dengan kunci dalam preparedData
              totalLabel="Total Shifting"
              config={chartConfig}
            />
          </div>
        </div>

        {/* Area Graph */}
        <div className="col-span-4 h-full">
          <AreaGraph
            title="Absensi Karyawan"
            description={`Menampilkan absensi karyawan pada bulan ${month} tahun ${year}`}
            data={dataAttendance?.data}
            dataKeys={dataKeys}
            xAxisConfig={{
              dataKey: 'date',
              tickFormatter: (value) => moment(value).format('DD'),
              tickLine: true,
              axisLine: false,
              tickMargin: 8
            }}
            tooltipTitleFormatter={(value) => {
              return moment(value).format('DD MMMM YYYY');
            }}
          />
        </div>
      </div>
      <Separator className="my-2" />
      <Tabs defaultValue="1" className="">
        <TabsList>
          {tabItems.map((item) => {
            return (
              <TabsTrigger
                key={item.id}
                value={item.id.toString()}
                className="!cursor-pointer"
              >
                {item.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <Separator className="my-2" />

        {tabItems.map((item) => {
          return (
            <TabsContent key={item.id} value={item.id.toString()}>
              {item.content}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default DetailDivision;
