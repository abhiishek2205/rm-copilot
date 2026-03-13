import { useState } from "react";
import { useClients } from "../../hooks/useClientStore";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, AlertTriangle } from "lucide-react";

export default function MeetingBriefScreen() {
  const { selectedClient } = useClients();
  const navigate = useNavigate();
  const [briefVisible, setBriefVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!selectedClient) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No client selected.
      </div>
    );
  }

  const client = selectedClient;

  const handleGenerateBrief = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBriefVisible(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

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

        {/* ── Generate Button ── */}
        {!briefVisible && !loading && (
          <button
            onClick={handleGenerateBrief}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Generate Meeting Brief
          </button>
        )}

        {/* ── Loading Spinner ── */}
        {loading && (
          <div className="flex items-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600">
              AI is preparing your brief...
            </span>
          </div>
        )}

        {/* ── Brief Card ── */}
        {briefVisible && (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
              {/* Section 1 — AUM Snapshot */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  AUM Snapshot
                </h3>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Total AUM: ₹{(client.aum / 100000).toFixed(1)}L
                </p>
                <div className="space-y-1">
                  {client.portfolioBreakdown.map((item) => (
                    <p key={item.product} className="text-sm text-gray-600">
                      {item.product} — {item.percentage}%
                    </p>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Section 2 — Last Interaction */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Last Interaction
                </h3>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {client.lastInteraction}
                </p>
                {client.conversationHistory.length > 0 && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {client.conversationHistory[0].summary}
                  </p>
                )}
              </div>

              <hr className="border-gray-200" />

              {/* Section 3 — Open Issues */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Open Issues
                </h3>
                {client.openIssues.length === 0 ? (
                  <p className="text-sm text-green-600 font-medium">
                    No open issues
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {client.openIssues.map((issue, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <hr className="border-gray-200" />

              {/* Section 4 — Pitch Recommendations */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Pitch Recommendations
                </h3>
                {client.pitchRecommendations.map((rec, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      {rec.product}
                    </p>

                    {/* Confidence bar */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                        {rec.confidence}% confidence
                      </span>
                    </div>

                    {/* Reasons */}
                    <ul className="space-y-1.5">
                      {rec.reasons.map((reason, j) => (
                        <li
                          key={j}
                          className="text-sm text-gray-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                        >
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200" />

              {/* Section 5 — Suggested Opening Line */}
              <div className="px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Suggested Opening Line
                </h3>
                <div className="bg-blue-50 rounded-lg px-5 py-4">
                  <p className="text-sm text-blue-800 italic leading-relaxed">
                    "Hi {client.name}, great to connect again! I wanted to follow
                    up on our recent discussion about{" "}
                    {client.pitchRecommendations.length > 0
                      ? client.pitchRecommendations[0].product
                      : client.products[0]}{" "}
                    and share some insights I think you'll find valuable."
                  </p>
                </div>
              </div>
            </div>

            {/* ── Conversation History ── */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Conversation History
              </h3>

              <div className="space-y-3">
                {client.conversationHistory.map((conv, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-start gap-4"
                  >
                    {/* Date */}
                    <div className="text-sm text-gray-500 font-medium whitespace-nowrap min-w-[90px]">
                      {conv.date}
                    </div>

                    {/* Type Badge */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                        conv.type === "meeting"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {conv.type === "meeting" ? "Meeting" : "Call"}
                    </span>

                    {/* Sentiment Dot */}
                    <span
                      className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        conv.sentiment === "positive"
                          ? "bg-green-500"
                          : conv.sentiment === "negative"
                          ? "bg-red-500"
                          : "bg-yellow-400"
                      }`}
                    />

                    {/* Summary */}
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                      {conv.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
