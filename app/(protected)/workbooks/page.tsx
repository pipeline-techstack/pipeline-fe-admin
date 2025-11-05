"use client";
import { Copy, Search } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageHeader from "@/components/ui/page-header";

const WorkbooksPage = () => {
  const [search, setSearch] = useState("");

  const workbooks = [
    {
      id: "1",
      name: "Q1 Sales Workbook",
      owners: ["John Doe", "Jane Smith"],
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      name: "Marketing Campaign 2025",
      owners: ["Jane Smith"],
      createdAt: "2025-02-20",
    },
    {
      id: "3",
      name: "Customer Onboarding",
      owners: ["Mike Johnson", "Sarah Wilson", "Tom Brown"],
      createdAt: "2025-03-10",
    },
  ];

  const filteredWorkbooks = workbooks.filter((wb) =>
    wb.name.toLowerCase().includes(search.toLowerCase()) ||
    wb.owners.some((owner) =>
      owner.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <TooltipProvider>
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Workbooks"
            subtitle="Manage your workbooks"
          />

          <div className="relative w-64">
            <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search workbooks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 pr-4 pl-10 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="top-0 z-10 sticky bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                    Workbook
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                    Owner
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-900 text-right text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredWorkbooks.map((workbook) => (
                  <tr
                    key={workbook.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm">
                        {workbook.name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {workbook.owners.slice(0, 2).map((owner, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                          >
                            {owner}
                          </span>
                        ))}

                        {workbook.owners.length > 2 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                +{workbook.owners.length - 2} more
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
                              <div className="flex flex-wrap gap-1">
                                {workbook.owners.slice(2).map((owner, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                                  >
                                    {owner}
                                  </span>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>

                    <td className="flex justify-end px-6 py-4">
                      <button
                        onClick={() => alert(`Duplicate ${workbook.name}`)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredWorkbooks.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-gray-500 text-center text-sm"
                    >
                      No matching workbooks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-gray-500 text-sm">
          Total workbooks: {filteredWorkbooks.length}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default WorkbooksPage;