import { useClients } from "../../hooks/useClientStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const barColors = ["#2563EB", "#9CA3AF", "#16A34A"];

export default function BenchmarkingScreen() {
  const { selectedClient } = useClients();

  if (!selectedClient) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No client selected.
      </div>
    );
  }

  const client = selectedClient;

  const benchmarkData = [
    {
      name: client.peerBenchmark.segment,
      value: client.peerBenchmark.sgbAdoptionInSegment,
    },
    { name: "National Average", value: 52 },
    { name: "Top Performers", value: 81 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* ── Heading ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Peer Benchmarking
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Compare client adoption rates against industry segments
          </p>
        </div>

        {/* ── Bar Chart ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={benchmarkData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f3f4f6"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Adoption Rate"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                {benchmarkData.map((_, index) => (
                  <Cell key={index} fill={barColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Segment Comparison Table ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Segment Comparison
          </h2>

          <div className="divide-y divide-gray-100">
            {benchmarkData.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3.5"
              >
                {/* Segment Name */}
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {item.name}
                </span>

                {/* Percentage */}
                <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                  {item.value}%
                </span>

                {/* Badge */}
                <div className="w-36 flex justify-end">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      item.value > 60
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.value > 60 ? "Above Average" : "Average"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
