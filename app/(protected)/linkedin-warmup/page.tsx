"use client";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { Flame, PauseCircle, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import WarmupDetailsSheet from "./components/warmup-details-sheet";

const dummyEmails = [
  {
    id: 1,
    email: "annduncan1999@gmail.com",
    sent: "0 of 60",
    warmup: 80,
    health: 99,
    paused: false,
  },
  {
    id: 2,
    email: "claudiageorge1961@gmail.com",
    sent: "0 of 60",
    warmup: 80,
    health: 99,
    paused: false,
  },
];

const LinkedinWarmup = () => {
  const [emails, setEmails] = useState(dummyEmails);
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const filtered = emails.filter((e) =>
    e.email.toLowerCase().includes(search.toLowerCase()),
  );

  const togglePause = (id: number) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, paused: !email.paused } : email,
      ),
    );
  };

  return (
    <>
      <div className="mx-auto p-6 max-w-7xl">
        {/* HEADER */}

        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Linkedin warmup accounts"
            subtitle="Manage and view all linkedin warmup accounts"
          />

          {/* 🔍 Search Bar */}
          <div className="flex items-center gap-4">
            {/* Add Button */}
            <Button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            {/* HEAD */}
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600 text-sm text-left">
                <th className="px-6 py-3 w-[20%] font-semibold text-gray-900 text-sm text-left">
                  Email
                </th>
                <th className="px-6 py-3 w-[20%] font-semibold text-gray-900 text-sm text-left">
                  Emails sent
                </th>
                <th className="px-6 py-3 w-[20%] font-semibold text-gray-900 text-sm text-left">
                  Warmup emails
                </th>
                <th className="px-6 py-3 w-[20%] font-semibold text-gray-900 text-sm text-left">
                  Health score
                </th>
                <th className="px-6 py-3 w-[10%] font-semibold text-gray-900 text-sm text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {/* EMAIL */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <div
                      className="flex gap-2"
                      onClick={() => {
                        setSelectedEmail(row.email);
                        setSheetOpen(true);
                      }}
                    >
                      {row.email}
                      {!row.paused && (
                        <Flame className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </td>

                  {/* SENT */}
                  <td className="px-6 py-4 text-gray-600">{row.sent}</td>

                  {/* WARMUP */}
                  <td className="px-6 py-4 text-gray-600">{row.warmup}</td>

                  {/* HEALTH */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">
                      {row.health}%
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="flex justify-end items-center gap-4 px-6 py-4">
                    {/* Pause Button */}
                    <button
                      onClick={() => togglePause(row.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
                        row.paused
                          ? "bg-gray-200 text-gray-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      <PauseCircle className="w-4 h-4" />
                      {row.paused ? "Paused" : "Pause"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <WarmupDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        email={selectedEmail}
      />
    </>
  );
};

export default LinkedinWarmup;
