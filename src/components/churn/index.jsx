import { useClients } from "../../hooks/useClientStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

function getRiskColor(churnRisk) {
  if (churnRisk === "high") return "bg-red-100 text-red-700 border border-red-300";
  if (churnRisk === "medium") return "bg-yellow-100 text-yellow-700 border border-yellow-300";
  return "bg-green-100 text-green-700 border border-green-300";
}

function getRiskLabel(churnRisk) {
  if (churnRisk === "high") return "High Risk";
  if (churnRisk === "medium") return "Medium Risk";
  return "Low Risk";
}

function formatLakhs(amount) {
  return `₹${(amount / 100000).toFixed(0)}L`;
}

export default function ChurnScreen() {
  const { selectedClient } = useClients();

  const chartData = selectedClient.sentimentTrend.map((score, i) => ({
    month: months[i],
    score,
  }));

  const hasSignals =
    selectedClient.missedCalls > 0 || selectedClient.openIssues.length > 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          {selectedClient.name}
        </h2>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getRiskColor(selectedClient.churnRisk)}`}
        >
          {getRiskLabel(selectedClient.churnRisk)}
        </span>
      </div>

      {/* Sentiment Trend Card */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Sentiment Trend (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#4F46E5"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Churn Signals Card */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Churn Signals
        </h3>

        {hasSignals ? (
          <div className="space-y-3">
            {selectedClient.missedCalls > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="text-gray-700">
                  Missed Calls: {selectedClient.missedCalls}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className="text-gray-700">
                Idle Cash: {formatLakhs(selectedClient.idleCash)}
              </span>
            </div>

            {selectedClient.openIssues.map((issue, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="text-gray-700">{issue}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-600 font-medium">
            No active churn signals
          </p>
        )}
      </div>
    </div>
  );
}
