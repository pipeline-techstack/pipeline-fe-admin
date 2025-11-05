"use client";
import { getCustomers } from "@/services/customers-apis";
import { updateCustomer } from "@/services/customers-apis"; // 👈 import your update API
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Check, X, Search } from "lucide-react";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";

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
      queryClient.invalidateQueries({ queryKey: ["customers"] }); // refresh customer list
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    [key: string]: { name: string; phone_e164: string };
  }>({});
  const [search, setSearch] = useState("");

  const startEdit = (customer: any) => {
    setEditingId(customer.userId);
    setEditForm({
      [customer.userId]: {
        name: `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
        phone_e164: customer.phone_e164 || "",
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    const formData = editForm[id];
    if (!formData) return;

    // --- Handle name only if provided ---
    let firstName: string | undefined;
    let lastName: string | undefined;

    if (formData.name && formData.name.trim() !== "") {
      const [first, ...rest] = formData.name.trim().split(" ");
      firstName = first || undefined;
      lastName = rest.join(" ") || undefined;
    }

    const customer = customers.find((c: any) => c.userId === id);

    // --- Build payload dynamically ---
    const payload: any = {
      email: customer?.email || "",
      phone_e164: formData.phone_e164 || "",
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

  // --- Fuzzy Search Setup ---
  const fuse = useMemo(() => {
    return new Fuse(customers, {
      keys: ["firstName", "lastName", "email", "phone_e164"],
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
    <div className="mx-auto p-6 max-w-6xl container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2 font-bold text-gray-900 text-3xl">Customers</h1>
          <p className="text-gray-600">Manage your customer information</p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="relative w-64">
          <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 pr-4 pl-10 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg max-h-[500px] overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="top-0 z-10 sticky bg-gray-50 border-gray-200 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">
                  Name
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">
                  Email
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">
                  Phone Number
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {filteredCustomers.map((customer: any) => {
                const isEditing = editingId === customer.userId;
                const formData = editForm[customer.userId] || {};
                return (
                  <tr
                    key={customer.userId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          aria-label="Input"
                          type="text"
                          value={formData.name || ""}
                          onChange={(e) =>
                            handleInputChange(
                              customer.userId,
                              "name",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      ) : (
                        <div className="font-medium text-gray-900">
                          {customer.firstName ?? ""} {customer.lastName ?? ""}
                        </div>
                      )}
                    </td>

                    {/* Email (read-only) */}
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{customer.email}</div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          aria-label="Input"
                          type="tel"
                          value={formData.phone_e164 || ""}
                          onChange={(e) =>
                            handleInputChange(
                              customer.userId,
                              "phone_e164",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      ) : (
                        <div className="text-gray-600">
                          {customer.phone_e164 || "-"}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="flex justify-end px-6 py-4">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button
                            aria-label="Check"
                            onClick={() => saveEdit(customer.userId)}
                            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-white"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            aria-label="Cancel"
                            onClick={cancelEdit}
                            className="bg-gray-100 px-3 py-2 rounded-md"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(customer)}
                          className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-md"
                        >
                          <Pencil className="mr-2 w-4 h-4" />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-gray-500 text-center"
                  >
                    No matching customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-gray-500 text-sm">
        Total customers: {filteredCustomers.length}
      </div>
    </div>
  );
};

export default CustomersPage;
