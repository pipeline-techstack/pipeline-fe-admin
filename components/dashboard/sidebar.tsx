"use client";

import React, { useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Copyright,
  KeyRound,
  Building2,
  LayoutDashboard,
  ChevronsLeft,
  ChevronsRight,
  BookOpen,
  Stars,
  Network,
  Link2,
  Settings2,
  MessageSquare,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { logout } from "@/lib/auth";

const navigation = [
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Feature Allocation", href: "/resource", icon: Network },
  { name: "Workbooks", href: "/workbooks", icon: BookOpen },
  // { name: "Campaigns", href: "/campaigns", icon: Network },
  { name: "Organizations", href: "/", icon: Building2 },
  { name: "WB Configs", href: "/wb-config", icon: Settings2 },
  { name: "LinkedIn Sync", href: "/linkedin-sync", icon: Link2 },
  { name: "Campaign Permissions", href: "/permissions", icon: KeyRound },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Feedback", href: "/feedback", icon: Stars },
  { name: "Enrichments", href: "/enrichments", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleLogout = () => {
    logout();
    redirect("/login");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen transition-all duration-300",
        isCollapsed ? "w-20" : "w-60",
      )}
    >
      {/* Logo + Toggle */}
      <div className="flex justify-between items-center px-4 py-4 border-gray-200 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Pipeline AI Logo"
              className="w-10 h-10 rounded-md"
            />

            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">
                Pipeline AI
              </h1>
              <p className="text-gray-500 text-xs">Admin</p>
            </div>
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
                    ? "bg-blue-50 text-primary border-r-2 border-primary"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
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
        {/* <div className="bg-gray-300 rounded-full w-8 h-8" /> */}
        {!isCollapsed && (
  <div className="w-full px-3 pb-4">
    
    {/* Logout Button */}
    <Button
      onClick={handleLogout}
      className="w-full justify-center bg-red-400 hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98] text-white py-2 rounded-xl transition-all duration-300"
      aria-label="Logout"
    >
      Logout →
    </Button>

    {/* Footer Text */}
    <div className="mt-4 text-center">
      <p className="text-gray-600 text-sm font-medium">
        Pipeline Admin Dashboard
      </p>
      <p className="text-gray-400 text-xs mt-1">
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </div>

  </div>
)}
      </div>
    </div>
  );
}
