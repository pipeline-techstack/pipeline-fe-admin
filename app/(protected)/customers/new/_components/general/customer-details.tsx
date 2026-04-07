import React, { useState } from "react";
import SectionCard, { FieldGrid, FieldItem } from "../Card";
import { User } from "lucide-react";
import { Customer } from "@/lib/types/customer-types";
import { updateCustomer } from "@/services/customers-apis";
import { useQueryClient } from "@tanstack/react-query";
import ErrorState from "@/components/common/error";

const buildCustomerFields = (c: Customer) => [
  { id: "name", label: "Name", key: "name", isEditable: true },
  { id: "email", label: "Email", key: "email", isEditable: true },
  { id: "phone", label: "Phone", key: "phone", isEditable: true },
  {
    id: "slack",
    label: "Slack Channel ID",
    key: "slackChannelId",
    isCopy: true,
    isEditable: true,
  },
  {
    id: "teams",
    label: "Teams ID",
    key: "teamsId",
    isCopy: true,
    isEditable: true,
  },
  {
    id: "date",
    label: "Created On",
    key: "createdAt",
    isEditable: false,
  },
];

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState(customer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields = buildCustomerFields(customer);

  const handleEdit = () => {
    if (!editing) {
      setFormState(customer);
    }
    setEditing(!editing);
  };

  const handleCancel = () => {
    setFormState(customer); // reset changes
    setEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    let firstName: string | undefined;
    let lastName: string | undefined;

    if (formState.name && formState.name.trim() !== "") {
      const [first, ...rest] = formState.name.trim().split(" ");
      firstName = first || undefined;
      lastName = rest.join(" ") || undefined;
    }

    try {
      const payload: any = {
        email: customer?.email || "",
        phone_e164: formState.phone || "",
        slack_channel_id: formState.slackChannelId || "",
        teams_id: formState.teamsId || "",
        campaign_role: formState.role || "",
      };
      if (firstName) payload.firstName = firstName;
      if (lastName) payload.lastName = lastName;
      console.log("Updating customer:", payload);
      await updateCustomer({ payload });
      queryClient.invalidateQueries({ queryKey: ["customer", customer._id] });
      setEditing(false);
    } catch (err) {
      setError("Failed to update customer details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard
      title="Customer Details"
      subtitle="Basic information about the customer."
      icon={<User className="w-4 h-4" />}
      onEdit={handleEdit}
      isEditing={editing}
      onCancel={handleCancel}
      onSave={handleSave}
      editLabel={editing ? "Save" : "Edit"}
      isLoading={loading}
    >
      <FieldGrid cols={3}>
        {fields.map((f) => {
          // Hide "Date Added" field in edit mode
          if (editing && f.key === "createdAt") {
            return (
              <div key="campaignRole">
                <label className="block mb-1 text-gray-500 text-sm">
                  Campaign Role
                </label>
                <select
                  className="px-2 py-1 border rounded-md w-full text-sm"
                  value={formState.role || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                >
                  <option value="">Select role</option>
                  <option value="owner">Campaign Owner</option>
                  <option value="rep">Campaign Rep</option>
                </select>
              </div>
            );
          }

          return (
            <FieldItem
              key={f.id}
              label={f.label}
              value={formState[f.key as keyof Customer]}
              name={f.key}
              isEditing={editing && f.isEditable}
              onChange={(name, val) =>
                setFormState((prev) => ({ ...prev, [name]: val }))
              }
              isCopy={f.isCopy}
            />
          );
        })}
      </FieldGrid>

      {/* Error UI */}
      {error && (
        <ErrorState/>
      )}
    </SectionCard>
  );
};

export default CustomerDetails;
