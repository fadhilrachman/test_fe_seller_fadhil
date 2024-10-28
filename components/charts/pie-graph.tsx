'use client';

import * as React from 'react';
import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

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

type PieGraphProps = {
  title: string;
  description?: string;
  data: { name: string; value: number }[];
  dataKey: string;
  nameKey: string;
  totalLabel?: string;
  config: ChartConfig;
  innerRadius?: number;
  strokeWidth?: number;
  labelFontSize?: string;
};

export function PieGraph({
  title,
  description,
  data,
  dataKey,
  nameKey,
  totalLabel = 'Total',
  config,
  innerRadius = 60,
  strokeWidth = 5,
  labelFontSize = '3xl'
}: PieGraphProps) {
  const totalValue = React.useMemo(
    () =>
      data.reduce(
        (acc, curr) => acc + (curr[dataKey as keyof typeof curr] as number),
        0
      ),
    [data, dataKey]
  );

  return (
    <Card className="flex min-h-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-grow items-center justify-center">
        {data.reduce((a, b) => a + b.value, 0) === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ChartContainer
            config={config}
            className="mx-auto aspect-square h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  innerRadius={innerRadius}
                  strokeWidth={strokeWidth}
                  labelLine={false}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className={`fill-foreground text-${labelFontSize} font-bold`}
                            >
                              {totalValue.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              {totalLabel}
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
