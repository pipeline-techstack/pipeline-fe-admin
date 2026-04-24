"use client";
import PageWrapper from "@/components/common/page-wrapper";
import React from "react";
import Metrics from "../_components/metrics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SingleSelectComponent } from "../../wb-config/_components/single-select";
import DateFilter from "../_components/date-filter";
import MultiSelect from "@/components/common/multiselect";

const campaignData = [
  {
    name: "Q1 Outreach",
    accepted: 16,
    connectionsSent: 40,
    interested: 3,
    replyRate: 14.1,
  },
  {
    name: "Enterprise Push",
    accepted: 12,
    connectionsSent: 35,
    interested: 2,
    replyRate: 10,
  },
  {
    name: "West Coast Drive",
    accepted: 12,
    connectionsSent: 30,
    interested: 1,
    replyRate: 13,
  },
  {
    name: "Partner Referral",
    accepted: 11,
    connectionsSent: 25,
    interested: 1,
    replyRate: 12,
  },
  {
    name: "Re-engagement",
    accepted: 5,
    connectionsSent: 15,
    interested: 1,
    replyRate: 10,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;

    return (
      <div className="bg-white shadow-lg p-3 border rounded-lg text-sm">
        <p className="mb-2 font-semibold text-gray-800">{label}</p>
        <p className="text-green-500">Accepted: {data.accepted}</p>
        <p className="text-indigo-500">
          Connections Sent: {data.connectionsSent}
        </p>
        <p className="text-red-500">Interested: {data.interested}</p>
        <p className="text-yellow-500">Reply Rate: {data.replyRate}%</p>
      </div>
    );
  }

  return null;
};

const Sender = () => {
  return (
    <PageWrapper title="Sarah Chen" subtitle="Active">
      <Metrics />

      <div className="space-y-1">
        <span className="block text-secondary-foreground text-sm">
          Campaign Breakdown
        </span>
        <div className="flex gap-2">
          <div className="mt-2">
            <DateFilter />
          </div>
          <div className="w-[200px]">
            <MultiSelect
              options={[]}
              value={[]}
              onChange={() => {}}
              placeholder="Select Campaigns"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm mt-4 p-5 border rounded-md">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={campaignData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar dataKey="accepted" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="connectionsSent"
                fill="#4338ca"
                radius={[4, 4, 0, 0]}
              />
              <Bar dataKey="interested" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="replyRate" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Sender;
