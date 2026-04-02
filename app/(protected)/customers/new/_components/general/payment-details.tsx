import { useState } from "react";
import SectionCard, { FieldGrid, FieldItem } from "../Card";
import { Customer } from "@/lib/types/customer-types";
import { DollarSign } from "lucide-react";
import { updateCustomerPayment } from "@/services/customers-apis";

function PaymentDetailsCard({ customer }: { customer: Customer }) {
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState(customer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields = [
    { id: "payment_mode", label: "Payment Mode" },
    { id: "platform", label: "Platform" },
    { id: "payment_terms", label: "Payment Terms" },
    { id: "notes", label: "Notes" },
  ];

  const handleEdit = () => {
    if (!editing) {
      setFormState(customer); // reset to latest data
    }
    setEditing(true);
  };

  const handleCancel = () => {
    setFormState(customer); // reset changes
    setEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateCustomerPayment({
        user_id: customer._id,
        payload: {
          payment_mode: formState.paymentDetails?.payment_mode || "",
          platform: formState.paymentDetails?.platform || "",
          payment_terms: formState.paymentDetails?.payment_terms || "",
          notes: formState.paymentDetails?.notes || "",
        },
      });

      setEditing(false);
    } catch (err) {
      setError("Failed to update payment details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard
      title="Payment details"
      subtitle="Know where the dollar comes from."
      icon={<DollarSign className="w-4 h-4" />}
      isEditing={editing}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
      editLabel={editing ? "Save" : "Edit"}
      isLoading={loading}
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

      {/* Error UI */}
      {error && (
        <div className="bg-red-50 mt-4 px-3 py-2 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}
    </SectionCard>
  );
}

export default PaymentDetailsCard;