'use client';

import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import FormGenerator from '@/components/form-generator';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useDashboardAttendance,
  useDashboardShifting
} from '@/hooks/dashboard.hooks';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const [year, setYear] = useState<string>(
    moment().locale('en').format('YYYY')
  );
  const [month, setMonth] = useState<string>(
    moment().locale('en').format('MMMM')
  );
  const [dataPieChart, setDataPieChart] = useState<any[]>([]);

  const form = useForm({
    defaultValues: {
      month,
      year
    }
  });

  const { data: dataAttendance, refetch: isFetchingAttendance } =
    useDashboardAttendance({
      month,
      year
    });

  const { data: dataShifting, refetch: isFetchingShifting } =
    useDashboardShifting({
      month,
      year
    });

  useEffect(() => {
    if (dataShifting?.data) {
      const preparedData = dataShifting.data.map((item: any, index: number) => {
        return {
          name: item.name,
          value: 200,
          fill: `hsl(var(--chart-${index + 3}))`
        };
      });

      setDataPieChart(preparedData);
    }
  }, [dataShifting]);

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
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            {/* <CalendarDateRangePicker /> */}
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
                      id: moment()
                        .locale('en')
                        .subtract(i, 'month')
                        .format('MMMM'),
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
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className="col-span-4">
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
              <div className="col-span-4 md:col-span-3">
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
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
