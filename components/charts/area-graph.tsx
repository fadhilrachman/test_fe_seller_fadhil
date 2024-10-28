'use client';

import { TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

type AreaGraphProps = {
  title: string;
  description: string;
  data: any[];
  dataKeys: { key: string; label: string; colorVar: string }[];
  footerText?: string;
  trendingText?: string;
  xAxisConfig?: {
    dataKey: string;
    tickFormatter?: (value: any) => string;
    tickLine?: boolean;
    axisLine?: boolean;
    tickMargin?: number;
  };
  tooltipTitleFormatter?: (value: any) => string;
};

const defaultChartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
};

export function AreaGraph({
  title,
  description,
  data,
  dataKeys,
  footerText,
  trendingText,
  xAxisConfig = {
    dataKey: 'month',
    tickFormatter: (value) => value.slice(0, 3),
    tickLine: false,
    axisLine: false,
    tickMargin: 8
  },
  tooltipTitleFormatter = (value) => value
}: AreaGraphProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer
          config={defaultChartConfig}
          className="h-72 w-full md:h-96 lg:h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xAxisConfig.dataKey}
                tickLine={xAxisConfig.tickLine}
                axisLine={xAxisConfig.axisLine}
                tickMargin={xAxisConfig.tickMargin}
                tickFormatter={xAxisConfig.tickFormatter}
                interval={0}
                tick={{ angle: -45, textAnchor: 'end' }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
                labelFormatter={tooltipTitleFormatter}
              />
              {dataKeys.map(({ key, colorVar, label }) => (
                <Area
                  key={key}
                  dataKey={key}
                  name={label}
                  type="natural"
                  fill={`hsl(var(${colorVar}))`}
                  fillOpacity={0.4}
                  stroke={`hsl(var(${colorVar}))`}
                  stackId="a"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-center space-y-2 text-sm sm:flex-row sm:justify-between sm:space-y-0">
          {trendingText && (
            <div className="flex items-center gap-2 font-medium leading-none">
              {trendingText} <TrendingUp className="h-4 w-4" />
            </div>
          )}
          <div className="leading-none text-muted-foreground">{footerText}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
