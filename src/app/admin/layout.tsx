import React from "react";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";

export const metadata = {
  title: "Administrator Dashboard | Ceylon Aquatic Plants",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
