"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHeyreach } from "@/hooks/use-heyreach";
import PageHeader from "@/components/ui/page-header";

const PermissionsPage = () => {
  const router = useRouter();
  const { userPermissionsQuery } = useHeyreach({ enablePermissions: true });
  const { data: userPermissions = [], isLoading } = userPermissionsQuery;

  return (
    <TooltipProvider>
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Users & Campaign Permissions"
            subtitle="Manage user access and campaign assignments"
          />
          
          <Button 
            className="bg-zinc-800 hover:bg-zinc-700" 
            onClick={() => router.push("/permissions/new")}
          >
            New Permission
          </Button>
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading users...</p>
        ) : userPermissions.length === 0 ? (
          <p className="text-gray-500 text-sm">No user permissions found</p>
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
                      Assigned Campaigns
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userPermissions.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-gray-900 text-sm">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {user.campaigns?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {user.campaigns.slice(0, 2).map((c) => (
                              <span
                                key={c.id}
                                className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                              >
                                {c.name}
                              </span>
                            ))}

                            {user.campaigns.length > 2 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                    +{user.campaigns.length - 2} more
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
                                  <div className="flex flex-wrap gap-1">
                                    {user.campaigns.slice(2).map((c) => (
                                      <span
                                        key={c.id}
                                        className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                                      >
                                        {c.name}
                                      </span>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            No campaigns
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(
                              `/permissions/edit?email=${encodeURIComponent(
                                user.email
                              )}`
                            )
                          }
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

export default PermissionsPage;