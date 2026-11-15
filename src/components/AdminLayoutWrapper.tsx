"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-brand-surface w-full">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-surface flex flex-col lg:flex-row w-full">
      <AdminSidebar />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <main className="p-4 sm:p-8 lg:p-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
