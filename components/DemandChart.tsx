"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Datum {
  key: string;
  label: string;
  emoji: string;
  count: number;
  color: string;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Datum }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-gray-700 bg-[#0a0f1e] px-3 py-2 shadow-lg">
      <p className="ar text-sm font-bold text-ink">
        {d.emoji} {d.label}
      </p>
      <p className="ar text-sm text-accent">{d.count} طلب</p>
    </div>
  );
}

export default function DemandChart({ data }: { data: Datum[] }) {
  return (
    <div dir="ltr" className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 24, right: 8, left: 8, bottom: 8 }}
        >
          <XAxis
            dataKey="emoji"
            tick={{ fontSize: 20 }}
            tickLine={false}
            axisLine={{ stroke: "#1f2937" }}
            interval={0}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={28}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "rgba(20,184,166,0.08)" }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={900}>
            {data.map((d) => (
              <Cell key={d.key} fill={d.color} />
            ))}
            <LabelList
              dataKey="count"
              position="top"
              fill="#f9fafb"
              fontSize={13}
              fontWeight={700}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
