import { ClientProvider } from "./hooks/useClientStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar";
import Dashboard from "./pages/Dashboard";
import MeetingBrief from "./pages/MeetingBrief";
import Recommendations from "./pages/Recommendations";
import Benchmarking from "./pages/Benchmarking";
import Churn from "./pages/Churn";

export default function App() {
  return (
    <BrowserRouter>
      <ClientProvider>
        <div className="flex">
          <Sidebar />
          <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/brief/:clientId" element={<MeetingBrief />} />
              <Route
                path="/recommendations/:clientId"
                element={<Recommendations />}
              />
              <Route path="/benchmarking" element={<Benchmarking />} />
              <Route path="/churn/:clientId" element={<Churn />} />
            </Routes>
          </main>
        </div>
      </ClientProvider>
    </BrowserRouter>
  );
}
