import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-4">
      <Link
        href="/"
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-black dark:bg-white text-white dark:text-black" : "text-black-300 hover:bg-gray-700 hover:text-white"}`}
      >
        Home
      </Link>
      <Link
        href="/creation"
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/creation" ? "bg-black dark:bg-white text-white dark:text-black" : "text-black-300 hover:bg-gray-700 hover:text-white"}`}
      >
        Create
      </Link>
    </nav>
  );
}
