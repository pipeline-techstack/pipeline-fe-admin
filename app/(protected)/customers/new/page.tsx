"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCustomers } from "@/hooks/use-customers";
import { Bell, Building, Calendar, Mail, Phone, User } from "lucide-react";

const columns = [
  { key: "name", header: "Name", icon: <User size={16} />, width: 200 },

  { key: "email", header: "Email", icon: <Mail size={16} />, width: 280 },

  { key: "company", header: "Company", icon: <Building size={16} />, width: 220 },

  { key: "date", header: "Creation Date", icon: <Calendar size={16} />, width: 180 },

  { key: "phone", header: "Phone", icon: <Phone size={16} />, width: 180 },

  {
    key: "mode",
    header: "Notification Mode",
    icon: <Bell size={16} />,
    width: 260, // 👈 important for badges
    render: (row: any) => {
      if (!row.mode || row.mode.length === 0) return "-";

      return (
        <div className="flex gap-2 flex-wrap">
          {row.mode.map((m: string) => {
            const isSlack = m === "Slack";

            return (
              <Badge
                key={m}
                variant="secondary"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit"
              >
                <Image
                  src={isSlack ? "/slack.png" : "/teams.png"}
                  alt={m}
                  width={14}
                  height={14}
                />
                <span className="font-medium text-xs">{m}</span>
              </Badge>
            );
          })}
        </div>
      );
    },
  },
];

export default function CustomerPage() {
  const { customers, isLoading, search, setSearch, error } = useCustomers();
  const [datapage, setDatapage] = useState(1);
  const router = useRouter();

  const handleclick = (row: any) => {
    router.push(`new/${row._id}`);
  };

  return (
    <PageWrapper
      // title="Customer Management"
      title="All Customers"
      subtitle="Click a customer row to view their full profile."
      rightComponent={
        <div className="flex items-center gap-3">
          {/* Search */}
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none focus:border-none outline-none w-64"
          />
        </div>
      }
    >
      {/* Table */}
      <DataTable
        data={customers}
        columns={columns}
        footer={true}
        currentPage={datapage}
        onPageChange={setDatapage}
        onRowClick={handleclick}
        loading={isLoading}
        error={error}
      />
    </PageWrapper>
  );
}
