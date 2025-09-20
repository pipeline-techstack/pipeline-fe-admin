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
          className="btn-shine bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
          aria-label="Logout"
        >
          <LogOut size={20} />
          
          <span className="">
            Logout
          </span>
        </Button>
      </div>
    </header>
  );
}
