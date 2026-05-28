export type Stat = {
  id: string;
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  sparkline: number[];
};

export const DASHBOARD_STATS: Stat[] = [
  {
    id: "revenue",
    label: "Revenue (30d)",
    value: "$184,260",
    delta: "+12.4%",
    positive: true,
    sparkline: [42, 45, 38, 50, 48, 55, 60, 58, 65, 70, 68, 78],
  },
  {
    id: "units",
    label: "Units sold",
    value: "21,408",
    delta: "+8.1%",
    positive: true,
    sparkline: [60, 58, 65, 62, 70, 68, 72, 75, 73, 78, 82, 85],
  },
  {
    id: "active",
    label: "Active titles",
    value: "126",
    delta: "+3",
    positive: true,
    sparkline: [110, 112, 115, 116, 118, 120, 121, 122, 124, 125, 125, 126],
  },
  {
    id: "refunds",
    label: "Refund rate",
    value: "1.8%",
    delta: "-0.4%",
    positive: true,
    sparkline: [3.2, 3.0, 2.8, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.85, 1.8],
  },
];

export const REVENUE_TREND: number[] = [
  4200, 4350, 4100, 4500, 4800, 5100, 4900, 5300, 5600, 5400, 5800, 6100,
  5900, 6300, 6500, 6700, 6500, 6900, 7200, 7000, 7400, 7600, 7900, 8100,
  7800, 8400, 8700, 8900, 9200, 9800,
];

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

export const CATALOG_HEALTH: DonutSegment[] = [
  { label: "Published", value: 92, color: "#00C16A" },
  { label: "Draft", value: 24, color: "#00D9FF" },
  { label: "Archived", value: 10, color: "#8B949E" },
];

export type TopPerformer = {
  id: string;
  title: string;
  studio: string;
  revenue: number;
  units: number;
};

export const TOP_PERFORMERS: TopPerformer[] = [
  { id: "cyberpunk-2099", title: "Cyberpunk 2099", studio: "Neon Forge", revenue: 52400, units: 2104 },
  { id: "starforge-odyssey", title: "Starforge Odyssey", studio: "Helion Works", revenue: 41200, units: 1832 },
  { id: "shadow-protocol", title: "Shadow Protocol", studio: "Eclipse Studios", revenue: 35800, units: 1605 },
  { id: "ironclad-tactics", title: "Ironclad Tactics", studio: "Vanguard Lab", revenue: 22100, units: 998 },
  { id: "neon-drift", title: "Neon Drift", studio: "Pulse Games", revenue: 18450, units: 814 },
];
