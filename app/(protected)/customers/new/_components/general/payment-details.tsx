import { useState } from "react";
import SectionCard, { FieldGrid, FieldItem } from "../Card";
import { Customer } from "@/lib/types/customer-types";
import { DollarSign } from "lucide-react";

const buildPaymentFields = (c: Customer) => [
  {
    id: "payment_mode",
    label: "Payment Mode",
    value: c.paymentDetails.payment_mode,
    isBadge: false,
  },
  {
    id: "platform",
    label: "Platform",
    value: c.paymentDetails.platform,
    isBadge: false,
  },
  {
    id: "payment_terms",
    label: "Payment Terms",
    value: c.paymentDetails.payment_terms,
    isBadge: false,
  },
];


function PaymentDetailsCard({ customer }: { customer: Customer }) {
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState(customer);

  const fields = buildPaymentFields(customer);

  return (
    <SectionCard
      title="Payment details"
      subtitle="Know where the dollar comes from."
      icon={<DollarSign className="w-4 h-4" />}
      onEdit={() => {
        if (editing) {
          console.log("Saving payment...", formState);
        }
        setEditing(!editing);
      }}
      editLabel={editing ? "Save" : "Edit"}
    >
      <FieldGrid cols={3}>
        {fields.map((f) => (
          <FieldItem
            key={f.id}
            label={f.label}
            value={formState.paymentDetails?.[f.id]}
            name={f.id}
            isEditing={editing}
            onChange={(name, val) =>
              setFormState((prev) => ({
                ...prev,
                paymentDetails: {
                  ...prev.paymentDetails,
                  [name]: val,
                },
              }))
            }
          />
        ))}
      </FieldGrid>
    </SectionCard>
  );
}

export default PaymentDetailsCard;