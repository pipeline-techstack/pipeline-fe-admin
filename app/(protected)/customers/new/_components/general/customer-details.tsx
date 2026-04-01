import React, { useState } from "react";
import SectionCard, { FieldGrid, FieldItem } from "../Card";
import { User } from "lucide-react";
import { Customer } from "@/lib/types/customer-types";

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
    label: "Date Added",
    key: "createdAt",
    isEditable: false, // ❌ not editable
  },
];

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState(customer);

  const fields = buildCustomerFields(customer);

  return (
    <SectionCard
      title="Customer Details"
      subtitle="Basic information about the customer."
      icon={<User className="w-4 h-4" />}
      onEdit={() => {
        setEditing(!editing);
      }}
      isEditing={editing}
      onCancel={() => {
        setEditing(false);
      }}
      onSave={() => {
        setEditing(false);
      }}
      editLabel={editing ? "Save" : "Edit"}
    >
      <FieldGrid cols={3}>
        {fields.map((f) => (
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
        ))}
      </FieldGrid>
    </SectionCard>
  );
};

export default CustomerDetails;
