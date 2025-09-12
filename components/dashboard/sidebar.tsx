"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Users, Copyright, KeyRound, Building2 } from "lucide-react";

const navigation = [
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Organizations", href: "/", icon: Building2  },
  { name: "Permissions", href: "/permissions", icon: KeyRound },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col w-64">
      {/* Logo */}
      <div className="mt-6 px-6 py-4 border-gray-200 border-b">
        <h1 className="px-4 py-2 font-bold text-gray-900 text-4xl">Pipeline</h1>
        <p className="px-4 py-1 text-gray-500 text-md">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg w-full font-medium text-sm text-left transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 w-5 h-5" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-gray-200 border-t">
        <div className="flex items-center">
          <div className="bg-gray-300 rounded-full w-8 h-8" />
          <div className="ml-3">
            <p className="font-medium text-gray-700 text-sm">
              Pipeline Admin Dashboard
            </p>
            <p className="flex items-center gap-1 text-gray-500 text-xs">
              <Copyright className="w-3 h-3" /> 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
