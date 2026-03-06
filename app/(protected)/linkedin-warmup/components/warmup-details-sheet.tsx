"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Flame, Pause } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string | null;
};

export default function WarmupDetailsSheet({
  open,
  onOpenChange,
  email,
}: Props) {
  if (!email) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg">{email}</h2>
              <Flame className="w-5 h-5 text-green-500" />
            </div>

            <Button variant="outline" className="flex gap-2">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          </div>

          {/* TABS */}
          <div className="flex gap-6 pb-2 border-b font-medium text-sm">
            <span className="pb-2 border-blue-500 border-b-2 text-blue-600">
              Warmup
            </span>
            <span className="text-gray-500">Settings</span>
            <span className="text-gray-500">Campaigns</span>
          </div>


          {/* SUMMARY */}
          <div className="p-6 border rounded-xl">
            <h3 className="mb-4 font-semibold">Summary for past week</h3>

            <div className="gap-6 grid grid-cols-2 text-sm">
              <div>
                <b>124</b> warmup emails received
              </div>

              <div>
                <b>80</b> warmup emails sent
              </div>

              <div>
                <b>1</b> saved from spam
              </div>
            </div>
          </div>

          {/* CHART PLACEHOLDER */}
          <div className="p-6 border rounded-xl">
            <h3 className="mb-6 font-semibold">Warmup Emails Sent</h3>

            <div className="flex items-end gap-4 h-[160px]">
              {[10, 10, 10, 10, 10, 10, 10].map((v, i) => (
                <div
                  key={i}
                  className="bg-green-500 rounded-md w-10"
                  style={{ height: `${v * 10}px` }}
                />
              ))}
            </div>

            <div className="flex justify-between mt-2 text-gray-500 text-xs">
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}