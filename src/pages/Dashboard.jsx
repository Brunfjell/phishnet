import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const stats = [
    { name: "Total Email Sent", value: 50 },
    { name: "Total Opened Email", value: 45 },
    { name: "Total Bounced Email", value: 5 },
    { name: "Total Mark as Spam", value: 18 },
    { name: "Total Phish Clicks", value: 32 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="p-4 bg-base-200">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-2">
          {stats.map((s, idx) => (
            <div key={idx} className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-title">{s.name}</div>
              <div className="stat-value text-md">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 bg-base-100 shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Overall Metrics</h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  label
                >
                  {stats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
