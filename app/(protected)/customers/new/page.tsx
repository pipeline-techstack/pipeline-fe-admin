"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageWrapper from "@/components/common/page-wrapper";
import { DataTable } from "@/components/common/table/data-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCustomers } from "@/hooks/use-customers";

// mock data (replace with API later)
const data = [
  {
    _id: "1",
    name: "Ava Johnson",
    email: "ava@acme.com",
    company: "Acme Corp",
    date: "Dec 12",
    phone: "+1 (415) 555-0182",
    mode: "Slack",
  },
  {
    _id: "2",
    name: "Liam Carter",
    email: "liam@mike.com",
    company: "Mike Corp",
    date: "Dec 12",
    phone: "+1 (212) 555-0198",
    mode: "Teams",
  },
  {
    _id: "3",
    name: "Noah Kim",
    email: "noah@global.com",
    company: "Global Tech",
    date: "Dec 12",
    phone: "+44 20 7946 0991",
    mode: "Slack",
  },
  {
    _id: "4",
    name: "Sophia Lee",
    email: "sophia@med.com",
    company: "Medi Connect",
    date: "Dec 12",
    phone: "+1 (646) 555-0144",
    mode: "Teams",
  },
  {
    _id: "5",
    name: "Mason Reed",
    email: "mason@launch.co",
    company: "Launch Pad",
    date: "Dec 12",
    phone: "+1 (415) 555-0182",
    mode: "Teams",
  },
  {
    _id: "6",
    name: "Olivia Brown",
    email: "olivia@nova.com",
    company: "Nova Systems",
    date: "Dec 13",
    phone: "+1 (310) 555-0175",
    mode: "Slack",
  },
  {
    _id: "7",
    name: "Ethan Walker",
    email: "ethan@orbit.com",
    company: "Orbit Labs",
    date: "Dec 13",
    phone: "+1 (202) 555-0133",
    mode: "Teams",
  },
  {
    _id: "8",
    name: "Isabella Moore",
    email: "isabella@zenith.com",
    company: "Zenith Corp",
    date: "Dec 13",
    phone: "+1 (718) 555-0199",
    mode: "Slack",
  },
  {
    _id: "9",
    name: "James Anderson",
    email: "james@alpha.io",
    company: "Alpha Inc",
    date: "Dec 14",
    phone: "+1 (650) 555-0166",
    mode: "Teams",
  },
  {
    _id: "10",
    name: "Charlotte Wilson",
    email: "charlotte@prime.com",
    company: "Prime Solutions",
    date: "Dec 14",
    phone: "+1 (408) 555-0155",
    mode: "Slack",
  },
  {
    _id: "11",
    name: "Benjamin Taylor",
    email: "benjamin@core.com",
    company: "Core Systems",
    date: "Dec 14",
    phone: "+1 (917) 555-0111",
    mode: "Teams",
  },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "company", header: "Company" },
  { key: "date", header: "Creation Date" },
  { key: "phone", header: "Phone" },
   {
  key: "mode",
  header: "Notification Mode",
  render: (row: any) => {
    const isSlack = row.mode === "Slack";

    return (
      <Badge
        variant="secondary"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit"
      >
        <Image
          src={isSlack ? "/slack.png" : "/teams.png"}
          alt={row.mode}
          width={14}
          height={14}
        />
        <span className="font-medium text-xs">{row.mode}</span>
      </Badge>
    );
  },
}
  // {
  //   key: "mode",
  //   header: "Notification Mode",
  //   render: (row: any) => {
  //     if (!row.mode || row.mode.length === 0) return "-";

  //     return (
  //       <div className="flex gap-2">
  //         {row.mode.map((m: string) => {
  //           const isSlack = m === "Slack";

  //           return (
  //             <Badge
  //               key={m}
  //               variant="secondary"
  //               className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit"
  //             >
  //               <Image
  //                 src={isSlack ? "/slack.png" : "/teams.png"}
  //                 alt={m}
  //                 width={14}
  //                 height={14}
  //               />
  //               <span className="font-medium text-xs">{m}</span>
  //             </Badge>
  //           );
  //         })}
  //       </div>
  //     );
  //   },
  // },
];

export default function CustomerPage() {
  const { customers, isLoading, search, setSearch } = useCustomers();
  const [datapage, setDatapage] = useState(1);
  const router = useRouter();

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handleclick = (row) => {
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
        data={filteredData}
        columns={columns}
        footer={true}
        pageSize={10}
        currentPage={datapage}
        onPageChange={setDatapage}
        onRowClick={handleclick}
      />
    </PageWrapper>
  );
}
