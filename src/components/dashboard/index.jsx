import { useClients } from "../../hooks/useClientStore";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Star,
  BarChart2,
  TrendingDown,
  Bell,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Meeting Brief", icon: FileText, path: "/brief" },
  { label: "Recommendations", icon: Star, path: "/recommendations" },
  { label: "Benchmarking", icon: BarChart2, path: "/benchmarking" },
  { label: "Churn Analysis", icon: TrendingDown, path: "/churn" },
];

export default function DashboardScreen() {
  const { clients, setSelectedClient } = useClients();
  const navigate = useNavigate();
  const location = useLocation();

  // Filter out the metadata object (first entry in clients.json)
  const realClients = clients.filter((c) => c.id);

  const highRiskCount = realClients.filter(
    (c) => c.churnRisk === "high"
  ).length;

  const handleViewBrief = (clientId) => {
    setSelectedClient(clientId);
    navigate(`/brief/${clientId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ── Sidebar ── */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-lg font-semibold tracking-tight">
            RM CoPilot
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map(({ label, icon: Icon, path }) => {
            const isActive =
              path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(path);

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            Client Overview
          </h1>

          <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            {highRiskCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                {highRiskCount}
              </span>
            )}
          </button>
        </header>

        <div className="p-8">
          {/* Alert Banner */}
          {highRiskCount > 0 && (
            <div className="flex items-center gap-3 px-5 py-3.5 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-600 text-lg">⚠</span>
              <p className="text-sm font-medium text-yellow-800">
                {highRiskCount} client{highRiskCount > 1 ? "s" : ""} need
                {highRiskCount === 1 ? "s" : ""} attention today
              </p>
            </div>
          )}

          {/* Client Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    Client Name
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    AUM
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    Products
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    Churn Risk
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    Last Interaction
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {realClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Client Name */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {client.name}
                      </span>
                    </td>

                    {/* AUM */}
                    <td className="px-6 py-4 text-gray-700">
                      ₹{(client.aum / 100000).toFixed(1)}L
                    </td>

                    {/* Products */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {client.products.map((product) => (
                          <span
                            key={product}
                            className="inline-block px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Churn Risk */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          client.churnRisk === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {client.churnRisk === "high" ? "High" : "Low"}
                      </span>
                    </td>

                    {/* Last Interaction */}
                    <td className="px-6 py-4 text-gray-600">
                      {client.lastInteraction}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewBrief(client.id)}
                        className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Brief
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
