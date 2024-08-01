import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex items-center justify-center min-h-screen w-full">{children}</main>;
};

export default Layout;
