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
import Image from "next/image";
import PageHeader from "../ui/page-header";

const navigation = [
  // { name: "Customers", href: "/customers", icon: Users },
  // { name: "Feature Allocation", href: "/resource", icon: Network },
  // { name: "Workbooks", href: "/workbooks", icon: BookOpen },
  // // { name: "Campaigns", href: "/campaigns", icon: Network },
  // { name: "Organizations", href: "/", icon: Building2 },
  // { name: "WB Configs", href: "/wb-config", icon: Settings2 },
  // { name: "LinkedIn Sync", href: "/linkedin-sync", icon: Link2 },
  // { name: "Campaign Permissions", href: "/permissions", icon: KeyRound },
  // { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // { name: "Feedback", href: "/feedback", icon: Stars },
  // { name: "Enrichments", href: "/enrichments", icon: MessageSquare },
  { name: "Customer Management", href: "/customers/new", icon: Users },
  { name: "Campaign Setup", href: "/campaigns", icon: Network },
    // { name: "Campaign Setup", href: "/campaigns/new", icon: Users },
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
      <div
        className={`flex ${isCollapsed ? "justify-center" : "justify-between"} px-4 py-4`}
      >
        {!isCollapsed && (
          <div className="flex items-start gap-3">
            <Image
              src="/logo.png"
              alt="Pipeline AI Logo"
              className="mt-1 rounded-md"
              width={32}
              height={32}
            />
            <div>
              <h1 className="text-secondary-foreground text-lg leading-tight">
                Pipeline AI
              </h1>
              <p className="text-muted-foreground text-xs">Admin</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded text-muted-foreground hover:text-gray-800 transition"
        >
          {isCollapsed ? (
            <ChevronsRight className="size-5" />
          ) : (
            <ChevronsLeft className="size-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <TooltipProvider>
        <nav className="flex flex-col flex-1 items-center space-y-1 mt-4 px-2">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);

            const button = (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg w-full text-[#4b4d4e] text-sm transition-colors",
                  isCollapsed && "justify-center",
                  isActive
                    ? "bg-gray-200  "
                    : " hover:bg-gray-100",
                )}
              >
                <item.icon className="w-5 h-5 text-[#4a5464]" />
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
          <div className="pb-4 w-full">
            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="justify-center bg-red-400 hover:bg-red-500 py-2 rounded-xl w-full text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 btn-shine"
              aria-label="Logout"
            >
              Logout →
            </Button>

            {/* Footer Text */}
            {/* <div className="mt-4 text-left">
              <p className="text-gray-600 text-sm">Pipeline Admin Dashboard</p>
              <p className="mt-1 text-gray-400 text-xs">
                © {new Date().getFullYear()} All Rights Reserved
              </p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
