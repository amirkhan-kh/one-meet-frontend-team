
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 40 },
  { month: "July", desktop: 314, mobile: 120 },
  { month: "August", desktop: 244, mobile: 10 },
  { month: "September", desktop: 204, mobile: 120 },
  { month: "October", desktop: 14, mobile: 100 },
  { month: "November", desktop: 414, mobile: 190 },
  { month: "December", desktop: 114, mobile: 240 },

]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#1f33ad",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} 

export function ComponentChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full bg-blue-100 rounded-md">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={1}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 5)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
