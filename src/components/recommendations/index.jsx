import { useClients } from "../../hooks/useClientStore";
import { AlertTriangle } from "lucide-react";

export default function RecommendationsScreen() {
  const { selectedClient } = useClients();

  if (!selectedClient) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No client selected.
      </div>
    );
  }

  const client = selectedClient;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* ── Client Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              client.churnRisk === "high"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {client.churnRisk === "high" ? "High Risk" : "Low Risk"}
          </span>
        </div>

        {/* ── Heading ── */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">
            Product Recommendations
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered suggestions based on client profile and peer data
          </p>
        </div>

        {/* ── Recommendation Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {client.pitchRecommendations.map((rec, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 flex flex-col"
            >
              {/* Product Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {rec.product}
              </h3>

              {/* Confidence Bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {rec.confidence}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${rec.confidence}%` }}
                  />
                </div>
              </div>

              {/* Why This Product */}
              <div className="mb-5 flex-1">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Why This Product
                </h4>
                <ul className="space-y-2">
                  {rec.reasons.map((reason, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risk Flag */}
              {client.riskFlag && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{client.riskFlag}</p>
                </div>
              )}

              {/* Recommend Button */}
              <button className="w-full px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors mt-auto">
                Recommend to Client
              </button>
            </div>
          ))}
        </div>

        {/* ── Peer Insights ── */}
        {client.peerBenchmark && (
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Peer Insight:</span>{" "}
              {client.peerBenchmark.sgbAdoptionInSegment}% of clients in the{" "}
              <span className="font-medium">
                {client.peerBenchmark.segment}
              </span>{" "}
              segment have invested in this product category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
