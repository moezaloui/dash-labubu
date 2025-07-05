import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <div className="hidden md:block">
          <SideBar />
        </div>

        {/* Sidebar Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute top-0 left-0 w-64 h-full bg-white shadow-md p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <SideBar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
