import React from "react";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}
export default function AppWrapper({ children }: Props) {
  return (
    <div className="h-full">
      <Sidebar />
      <main className="lg:pl-10 h-full">{children}</main>
    </div>
  );
}
