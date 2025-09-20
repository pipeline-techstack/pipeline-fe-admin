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
  Stars,
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
  { name: "Feedback", href: "/feedback", icon: Stars },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-gray-200 border-r h-screen transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo + Toggle */}
      <div className="flex justify-between items-center px-4 py-4 border-gray-200 border-b">
        {!isCollapsed && (
          <div>
            <h1 className="font-bold text-gray-900 text-2xl">Pipeline</h1>
            <p className="text-gray-500 text-sm">Admin Dashboard</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded text-gray-500 hover:text-gray-800 transition"
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
        <nav className="flex flex-col flex-1 space-y-1 mt-4 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            const button = (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg w-full font-medium text-sm transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-800 border-r-2 border-blue-800"
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
      <div className="flex items-center mt-auto p-4 border-gray-200 border-t">
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
