"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/auth";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export function Header() {
  const handleLogout = () => {
    logout();
    redirect("/login");

    // setAuthenticated(false);
  };
  return (
    <header className="bg-white h-14">
      <div className="flex justify-between items-center px-6 h-full">
        <div></div>
        <Button
          onClick={handleLogout}
          className="group relative hover:bg-red-50 p-2 rounded-lg text-red-600 hover:text-red-700 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={20} />
          <span className="top-full right-0 absolute bg-gray-500 opacity-0 group-hover:opacity-100 mt-2 px-2 py-1 rounded text-white text-sm whitespace-nowrap transition-opacity pointer-events-none">
            Logout
          </span>
        </Button>
      </div>
    </header>
  );
}
