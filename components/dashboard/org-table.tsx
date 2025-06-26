"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { AddOrganizationDialog } from "@/components/ui/dialog/add-organization";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/services/org-apis";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { OrganizationData } from "@/lib/types/org-types";

// const mockData: OrganizationData[] = [
//   {
//     id: "1",
//     srNo: "#20462",
//     company: "Google INC.",
//     customer: "Matt Dickerson",
//     quotaPlan: "45/100-Basic",
//     checked: true,
//   },
//   {
//     id: "2",
//     srNo: "#18933",
//     company: "Microsoft",
//     customer: "Wiktoria",
//     quotaPlan: "98/100-Premium",
//     checked: false,
//   },
//   {
//     id: "3",
//     srNo: "#20462",
//     company: "Google INC.",
//     customer: "Matt Dickerson",
//     quotaPlan: "45/100-Basic",
//     checked: false,
//   },
//   {
//     id: "4",
//     srNo: "#18933",
//     company: "Microsoft",
//     customer: "Wiktoria",
//     quotaPlan: "98/100-Premium",
//     checked: false,
//   },
//   {
//     id: "5",
//     srNo: "#20462",
//     company: "Google INC.",
//     customer: "Matt Dickerson",
//     quotaPlan: "45/100-Basic",
//     checked: true,
//   },
// ];
export function OrganizationTable() {
  const [data, setData] = useState<OrganizationData[]>([]);
  const router = useRouter();

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    retry: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.data);
    }
  }, [fetchedData]);

  if (isLoading) return <p>Loading organizations...</p>;
  if (isError)
    return <p className="text-red-600">Error: {(error as Error).message}</p>;

  // const navigate = useNavigate()

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setData((prev) =>
      prev.map((item) => (item._id === id ? { ...item, checked } : item))
    );
  };

  const handleRowClick = (organizationId: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking on checkbox
    if ((event.target as HTMLElement).closest('[role="checkbox"]')) {
      return;
    }

    // Navigate to organization detail page
    router.push(`/organization/${organizationId}`);
    // navigate(`/organization/${organizationId}`)
  };

  console.log("data", data);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
      {/* Table */}
      <div className="max-h-[calc(100vh-250px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                Company
              </TableHead>
              <TableHead className="font-medium text-gray-900">Quota</TableHead>
              <TableHead className="font-medium text-gray-900">Seats</TableHead>
              <TableHead className="font-medium text-gray-900">
                Updated
              </TableHead>
              <TableHead className="font-medium text-gray-900">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={(e) => handleRowClick(item._id, e)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(item._id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="text-gray-900">{item.name}</TableCell>
                <TableCell className="text-gray-700">
                  {item.monthlyQuota}
                </TableCell>
                <TableCell className="text-gray-700">{item.seats}</TableCell>
                <TableCell className="text-gray-700">
                  {formatDate(item.updatedAt)}
                </TableCell>
                <TableCell className="space-x-2 text-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    // onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    // onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer with pagination info */}
      <div className="bg-gray-50 px-6 py-4 border-gray-200 border-t">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            Showing {data.length} of {data.length} organizations
          </p>
        </div>
      </div>
    </div>
  );
}
