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
import { Pencil, Plus } from "lucide-react";

const PermissionsPage = () => {
  const router = useRouter();
  const { userPermissionsQuery } = useHeyreach({ enablePermissions: true });
  const { data: userPermissions = [], isLoading } = userPermissionsQuery;

  return (
    <TooltipProvider>
      <div className="bg-gray-50 px-4 py-8">
        <div className="bg-white shadow-sm mx-auto p-8 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900 text-2xl">
              Users & Campaign Permissions
            </h2>
            <Button className="bg-[#4A5BAA] hover:bg-[#3d4c92]" onClick={() => router.push("/permissions/new")}>
              <Plus className="mr-2 w-4 h-4" />
              New Form
            </Button>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : userPermissions.length === 0 ? (
            <p className="text-gray-500">No user permissions found</p>
          ) : (
            <table className="border border-gray-200 rounded-md w-full">
              <thead>
                <tr className="bg-gray-100 font-semibold text-gray-700 text-sm text-left">
                  <th className="p-2 border-b">Email</th>
                  <th className="p-2 border-b">Assigned Campaigns</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPermissions.map((user, index) => (
                  <tr key={index} className="text-gray-800 text-sm">
                    <td className="p-2 border-b">{user.email}</td>
                    <td className="p-2 border-b">
                      {user.campaigns?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.campaigns.slice(0, 2).map((c) => (
                            <span
                              key={c.id}
                              className="bg-blue-100 px-2 py-1 rounded-md text-[#4A5BAA] text-xs"
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
                                      className="bg-blue-50 px-2 py-0.5 rounded text-[#4A5BAA] text-xs"
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
                        <span className="text-gray-400 italic">
                          No campaigns
                        </span>
                      )}
                    </td>

                    <td className="p-2 border-b">
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
                        <Pencil className="mr-2 w-4 h-4" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PermissionsPage;
