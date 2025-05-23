"use client";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";
import { Header } from "@/modules/dashboard/components/header";
import { NotificationsSidebar } from "@/modules/dashboard/components/notification-sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarElement = document.querySelector('[class*="w-20"]');

      setSidebarCollapsed(!!sidebarElement);
    };

    checkSidebarState();

    const observer = new MutationObserver(checkSidebarState);
    const sidebar = document.querySelector(
      'div[class*="fixed inset-y-0 left-0"]'
    );

    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        setNotificationsOpen={setNotificationsOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-1 relative">
        <DashboardSidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main
          className={`flex-1 transition-margin duration-300 ${
            sidebarCollapsed ? "ml-16" : "sm:ml-64"
          }`}
        >
          {children}
        </main>
        <NotificationsSidebar
          open={notificationsOpen}
          onOpenChange={setNotificationsOpen}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;
