import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Star,
  BarChart2,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { useClients } from "../../hooks/useClientStore";

export default function Sidebar() {
  const { selectedClient } = useClients();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    {
      label: "Meeting Brief",
      icon: FileText,
      path: `/brief/${selectedClient?.id}`,
    },
    {
      label: "Recommendations",
      icon: Star,
      path: `/recommendations/${selectedClient?.id}`,
    },
    { label: "Benchmarking", icon: BarChart2, path: "/benchmarking" },
    {
      label: "Churn Analysis",
      icon: TrendingDown,
      path: `/churn/${selectedClient?.id}`,
    },
  ];

  // Determine base route for active matching
  const getBaseRoute = (path) => {
    if (path === "/") return "/";
    return "/" + path.split("/")[1];
  };

  const isActive = (itemPath) => {
    if (itemPath === "/") return location.pathname === "/";
    const base = getBaseRoute(itemPath);
    return location.pathname.startsWith(base);
  };

  return (
    <nav className="bg-slate-900 text-white h-screen w-64 flex flex-col fixed left-0 top-0 z-50">
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-700">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <span className="text-lg font-bold tracking-tight">RM CoPilot</span>
      </div>

      {/* ── Nav Links ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(path)
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ── RM Profile ── */}
      {selectedClient?.assignedRM && (
        <div className="border-t border-slate-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-semibold text-slate-300">
                {selectedClient.assignedRM
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
            </div>
            <span className="text-sm text-gray-300">
              {selectedClient.assignedRM}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
