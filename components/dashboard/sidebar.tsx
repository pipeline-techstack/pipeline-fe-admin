"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Copyright,
  KeyRound,
  Building2,
  LayoutDashboard,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Organizations", href: "/", icon: Building2 },
  { name: "Permissions", href: "/permissions", icon: KeyRound },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        {!isCollapsed && (
          <div>
            <h1 className="font-bold text-gray-900 text-2xl">Pipeline</h1>
            <p className="text-gray-500 text-sm">Admin Dashboard</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:text-gray-800 text-gray-500 transition"
        >
          {isCollapsed ? (
            <ChevronsRight className="w-6 h-6" />
          ) : (
            <ChevronsLeft className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <TooltipProvider>
        <nav className="flex-1 flex flex-col mt-4 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            const button = (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex items-center w-full rounded-lg px-3 py-2 transition-colors font-medium text-sm",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </button>
            );

            return isCollapsed ? (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ) : (
              button
            );
          })}
        </nav>
      </TooltipProvider>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto flex items-center">
        <div className="bg-gray-300 rounded-full w-8 h-8" />
        {!isCollapsed && (
          <div className="ml-3">
            <p className="font-medium text-gray-700 text-sm">
              Pipeline Admin Dashboard
            </p>
            <p className="flex items-center gap-1 text-gray-500 text-xs">
              <Copyright className="w-3 h-3" /> 2025 All Rights Reserved
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
