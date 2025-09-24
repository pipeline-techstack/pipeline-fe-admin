"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  fetchWorkbookConfigurations,
  WorkbookConfiguration,
} from "./services/config-apis";

const WorkbookConfigurationPage = () => {
  const router = useRouter();
  const [workbookConfigurations, setWorkbookConfigurations] = useState<
    WorkbookConfiguration[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const configs = await fetchWorkbookConfigurations();
        setWorkbookConfigurations(configs);
      } catch (err: any) {
        setError(err.message || "Failed to load configurations");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <TooltipProvider>
      <div className="bg-gray-50 px-4 py-8">
        <div className="bg-white shadow-sm mx-auto p-8 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-gray-900 text-2xl">
                Workbook Configuration
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                What is user and campaign Permission
              </p>
            </div>
            <Button onClick={() => router.push("/workbook-configurations/new")}>
              New Configuration
            </Button>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading workbook configurations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : workbookConfigurations.length === 0 ? (
            <p className="text-gray-500">No workbook configurations found</p>
          ) : (
            <table className="border border-gray-200 rounded-md w-full">
              <thead>
                <tr className="bg-gray-100 font-semibold text-gray-700 text-sm text-left">
                  <th className="p-3 border-b">Campaigns</th>
                  <th className="p-3 border-b">Workbooks</th>
                  <th className="p-3 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(workbookConfigurations) && workbookConfigurations.length > 0 ? (
                    workbookConfigurations.map((config) => (
                    <tr
                        key={config.id}
                        className="text-gray-800 text-sm hover:bg-gray-50"
                    >
                        <td className="p-3 border-b">
                        <span className="font-medium">{config.campaign}</span>
                        </td>
                        <td className="p-3 border-b">
                        <div className="flex flex-wrap gap-2">
                            {config.workbooks.slice(0, 2).map((workbook, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                            >
                                {workbook}
                            </span>
                            ))}

                            {config.workbooks.length > 2 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                    +{config.workbooks.length - 2} more
                                </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
                                <div className="flex flex-wrap gap-1">
                                    {config.workbooks.slice(2).map((workbook, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                                    >
                                        {workbook}
                                    </span>
                                    ))}
                                </div>
                                </TooltipContent>
                            </Tooltip>
                            )}

                            {config.additionalCount > 0 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                    +{config.additionalCount} more additional
                                </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                <div className="text-xs">
                                    <p className="font-medium mb-1">Additional Workbooks:</p>
                                    <div className="space-y-1">
                                    {Array.from({ length: config.additionalCount }, (_, i) => (
                                        <div key={i}>
                                        Workbook {config.workbooks.length + i + 1} Ready
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                </TooltipContent>
                            </Tooltip>
                            )}
                        </div>
                        </td>
                        <td className="p-3 border-b text-center">
                        <Button
                            size="sm"
                            variant="outline"
                            // className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                            onClick={() =>
                            router.push(`/workbook-configurations/edit/${config.id}`)
                            }
                        >
                            Edit
                        </Button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={3} className="text-gray-500 text-center p-4">
                        {error || "No workbook configurations found"}
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default WorkbookConfigurationPage;