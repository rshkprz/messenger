import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function AppWrapper({ children }: Props) {
  return (
    <div className="h-full">
      <main className="h-full">{children}</main>
    </div>
  );
}
