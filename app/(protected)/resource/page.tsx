"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageHeader from "@/components/ui/page-header";
import { useGetResource } from "@/hooks/use-resource";

const mockAllocations = [
  {
    email: "john@example.com",
    resources: [
      { id: "dashboard", name: "Dashboard" },
      { id: "crm", name: "CRM" },
      { id: "campaign", name: "Campaign" },
    ],
  },
  {
    email: "sarah@example.com",
    resources: [
      { id: "data-library", name: "Data Library" },
    ],
  },
  {
    email: "mike@example.com",
    resources: [
      { id: "workbook", name: "Workbook" },
      { id: "inbox", name: "Inbox" },
    ],
  },
];

const ResourceAllocationPage = () => {
  const router = useRouter();
  const [allocations] = useState(mockAllocations);
  const permission = useGetResource()
  console.log("permissions get ", permission)

  const handleEdit = (user: any) => {
    // callback usage (can later pass via state/store)
    console.log("Editing user data:", user);

    router.push(
      `/resource/edit?email=${encodeURIComponent(user.email)}`
    );
  };
  
  return (
    <TooltipProvider>
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Feature Allocation"
            subtitle="Manage user feature access"
          />

          <Button
            className="bg-zinc-800 hover:bg-zinc-700"
            onClick={() => router.push("/resource/new")}
          >
            New Allocation
          </Button>
        </div>

        {allocations.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No feature allocations found
          </p>
        ) : (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="top-0 z-10 sticky bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                      Email
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                      Assigned Resources
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allocations.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-gray-900 text-sm">
                          {user.email}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {user.resources.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {user.resources.slice(0, 2).map((r) => (
                              <span
                                key={r.id}
                                className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                              >
                                {r.name}
                              </span>
                            ))}

                            {user.resources.length > 2 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                    +{user.resources.length - 2} more
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
                                  <div className="flex flex-wrap gap-1">
                                    {user.resources.slice(2).map((r) => (
                                      <span
                                        key={r.id}
                                        className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                                      >
                                        {r.name}
                                      </span>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            No resources
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                           onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ResourceAllocationPage;
