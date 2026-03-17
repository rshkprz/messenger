import React from "react";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}
export default function AppWrapper({ children }: Props) {
  return (
    <div className="h-full">
      <Sidebar />
      <main className="h-full">{children}</main>
    </div>
  );
}
