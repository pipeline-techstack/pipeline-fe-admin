"use client";
import { getCustomers } from "@/services/customers-apis";
import { updateCustomer } from "@/services/customers-apis";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Check, X, Search } from "lucide-react";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import PageWrapper from "@/components/common/page-wrapper";

const CustomersPage = () => {
  const queryClient = useQueryClient();

  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    [key: string]: {
      name: string;
      phone_e164: string;
      slack_channel_id: string;
    };
  }>({});
  const [search, setSearch] = useState("");

  const startEdit = (customer: any) => {
    setEditingId(customer.userId);
    setEditForm({
      [customer.userId]: {
        name: `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
        phone_e164: customer.phone_e164 || "",
        slack_channel_id: customer.slack_channel_id || "",
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    const formData = editForm[id];
    if (!formData) return;

    let firstName: string | undefined;
    let lastName: string | undefined;

    if (formData.name && formData.name.trim() !== "") {
      const [first, ...rest] = formData.name.trim().split(" ");
      firstName = first || undefined;
      lastName = rest.join(" ") || undefined;
    }

    const customer = customers.find((c: any) => c.userId === id);

    const payload: any = {
      email: customer?.email || "",
      phone_e164: formData.phone_e164 || "",
      slack_channel_id: formData.slack_channel_id || "",
    };

    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;

    console.log("🚀 Sending payload", payload);

    mutation.mutate({ payload });
    setEditingId(null);
  };

  const handleInputChange = (id: string, field: string, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const fuse = useMemo(() => {
    return new Fuse(customers, {
      keys: [
        "firstName",
        "lastName",
        "email",
        "phone_e164",
        "slack_channel_id",
      ],
      threshold: 0.3,
    });
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    return fuse.search(search).map((result) => result.item);
  }, [search, fuse, customers]);

  if (isLoading) return <div className="p-6">Loading customers...</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load customers</div>;

  return (
    <PageWrapper
      title="Customers"
      subtitle="Manage your customer information"
      rightComponent={
        <div className="relative w-64">
          <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 pr-4 pl-10 border border-gray-300 rounded-md w-full text-sm"
          />
        </div>
      }
    >
      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full border-collapse table-fixed">
            <thead className="top-0 z-10 sticky bg-gray-50 border-gray-200 border-b">
              <tr>
                <th className="px-6 py-3 w-[20%] font-semibold text-sm text-left">
                  Name
                </th>
                <th className="px-6 py-3 w-[35%] font-semibold text-sm text-left">
                  Email
                </th>
                <th className="px-6 py-3 w-[15%] font-semibold text-sm text-left">
                  Phone Number
                </th>
                <th className="px-6 py-3 w-[20%] font-semibold text-sm text-left">
                  Slack Channel ID
                </th>
                <th className="px-6 py-3 w-[10%] font-semibold text-sm text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer: any) => {
                const isEditing = editingId === customer.userId;
                const formData = editForm[customer.userId] || {};

                return (
                  <tr key={customer.userId} className="hover:bg-gray-50">
                    {/* Name */}
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name || ""}
                          onChange={(e) =>
                            handleInputChange(
                              customer.userId,
                              "name",
                              e.target.value,
                            )
                          }
                          className="px-3 py-2 border rounded-md w-full text-sm"
                        />
                      ) : (
                        <div className="font-medium text-sm">
                          {customer.firstName} {customer.lastName}
                        </div>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm">{customer.email}</td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-sm">
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone_e164 || ""}
                          onChange={(e) =>
                            handleInputChange(
                              customer.userId,
                              "phone_e164",
                              e.target.value,
                            )
                          }
                          className="px-3 py-2 border rounded-md w-full text-sm"
                        />
                      ) : (
                        customer.phone_e164 || "-"
                      )}
                    </td>

                    {/* Slack */}
                    <td className="px-6 py-4 text-sm">
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.slack_channel_id || ""}
                          onChange={(e) =>
                            handleInputChange(
                              customer.userId,
                              "slack_channel_id",
                              e.target.value,
                            )
                          }
                          className="px-3 py-2 border rounded-md w-full text-sm"
                        />
                      ) : (
                        customer.slack_channel_id || "-"
                      )}
                    </td>

                    {/* Actions */}
                    <td className="flex justify-end px-6 py-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(customer.userId)}
                            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-white"
                          >
                            <Check className="w-4 h-4" />
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(customer)}
                          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-gray-500 text-sm">
        Total customers: {filteredCustomers.length}
      </div>
    </PageWrapper>
  );
};

export default CustomersPage;
