"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Edit } from "lucide-react";
import { Users, X } from "lucide-react";
import { OrganizationFormData } from "@/lib/types/org-types";
import { useQueryClient } from "@tanstack/react-query";
import { addOrganization, editOrganization } from "@/services/org-apis";
import { LoadingButton } from "@/components/loader-button";
import { toast } from "@/hooks/use-toast";

interface AddOrganizationDialogProps {
  open: boolean;
  onClose: () => void;
  defaultValues?: OrganizationFormData;
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export function AddOrganizationDialog({
  open,
  onClose,
  defaultValues,
  isEditMode,
  onSuccess,
}: AddOrganizationDialogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: defaultValues?.organizationName || "",
    enterpriseId:
      defaultValues?.enterpriseId || `${process.env.NEXT_PUBLIC_PRICE_ID}`,
    email: defaultValues?.email || "",
    quota: defaultValues?.quota || 0,
    seats: defaultValues?.seats || 0,
    addQuota: 0,
    removeQuota: 0,
    addSeats: 0,
    removeSeats: 0,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        id: defaultValues.id,
        organizationName: defaultValues.organizationName || "",
        enterpriseId:
          defaultValues.enterpriseId || `${process.env.NEXT_PUBLIC_PRICE_ID}`,
        email: defaultValues.email || "",
        quota: defaultValues.quota || 0,
        seats: defaultValues.seats || 0,
        addQuota: 0,
        removeQuota: 0,
        addSeats: 0,
        removeSeats: 0,
      });
    }
  }, [defaultValues]);

  const [emailTouched, setEmailTouched] = useState(false);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof OrganizationFormData,
    value: string
  ) => {
    // Convert to number if it's a numeric field
    const numberFields: (keyof OrganizationFormData)[] = [
      "quota",
      "seats",
      "addSeats",
      "removeSeats",
      "addQuota",
      "removeQuota",
    ];

    setFormData((prev) => ({
      ...prev,
      [field]: numberFields.includes(field) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await editOrganization({
          id: formData?.id ?? "",
          name: formData.organizationName,
          email: formData.email ?? "",
          addQuota: formData.addQuota ?? 0,
          removeQuota: formData.removeQuota ?? 0,
          addSeats: formData.addSeats ?? 0,
          removeSeats: formData.removeSeats ?? 0,
        });
        toast({
          title: "Organization Updated",
          description: "Organization details have been updated successfully.",
          variant: "success",
        });
      } else {
        await addOrganization(formData);
      }
      toast({
        title: isEditMode ? "Organization Updated" : "Organization Added",
        description: isEditMode
          ? "Organization details have been updated successfully."
          : "New organization has been created successfully.",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess();
      }

      setFormData({
        organizationName: "",
        enterpriseId: `${process.env.NEXT_PUBLIC_PRICE_ID}`,
        email: "",
        quota: 0,
        seats: 0,
      });
      setEmailTouched(false);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    } catch (error) {
      console.error("Error adding organization:", error);
      toast({
        title: "Error",
        description: "Failed to add or update organization. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      organizationName: "",
      enterpriseId: `${process.env.NEXT_PUBLIC_PRICE_ID}`, //this will be hard coded
      email: "",
      quota: 0,
      seats: 0,
    });
    setEmailTouched(false);
  };

  const isFormValid =
    formData.organizationName &&
    formData.enterpriseId &&
    (isEditMode || (isEmailValid && formData.email && formData.quota));

  return (
    <>
      {open && (
        <div className="z-50 fixed inset-0 flex justify-center items-center">
          <div className="bg-white shadow-2xl mx-4 px-2 py-2 border border-gray-200 rounded-lg w-full max-w-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4 border-gray-100 border-b">
              <div className="flex items-center gap-2">
                {isEditMode ? (
                  <Edit className="w-7 h-7 text-gray-600" />
                ) : (
                  <Users className="w-7 h-7 text-gray-600" />
                )}
                <div>
                  <h2 className="font-semibold text-gray-900 text-2xl">
                    {isEditMode
                      ? "Edit organization"
                      : "Add enterprise organization"}
                  </h2>
                  <p className="mt-1 text-gray-600 text-sm">
                    {isEditMode
                      ? "Update organization details and settings"
                      : "Enterprise organization model & value proposition"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="hover:bg-gray-100 p-0 w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
              <div className="space-y-2">
                <Label
                  htmlFor="organizationName"
                  className="font-medium text-gray-700 text-base"
                >
                  Organization name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  required
                  placeholder="e.g. google.com"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  className="px-3 py-3 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="enterpriseId"
                  className="font-medium text-gray-700 text-base"
                >
                  Enterprise ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  readOnly
                  id="enterpriseId"
                  type="text"
                  required
                  placeholder="893qdefshnnqjdh"
                  value={formData.enterpriseId}
                  onChange={(e) =>
                    handleInputChange("enterpriseId", e.target.value)
                  }
                  className="bg-gray-50 px-3 py-3 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
                />
              </div>

              {!isEditMode && (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-medium text-gray-700 text-base"
                    >
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onBlur={() => setEmailTouched(true)}
                      className={`w-full px-3 py-3 text-base border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                        emailTouched && !isEmailValid
                          ? "border-red-300 ring-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />

                    {emailTouched && !isEmailValid && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Please enter a valid email (e.g. name@example.com)
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="quota"
                      className="font-medium text-gray-700 text-base"
                    >
                      Quota <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="quota"
                      type="text"
                      required
                      placeholder="e.g. 1000"
                      value={formData.quota}
                      onChange={(e) =>
                        handleInputChange("quota", e.target.value)
                      }
                      className="px-3 py-3 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
                    />
                  </div>
                </>
              )}

              {isEditMode && (
                <>
                  <div className="gap-4 grid grid-cols-2">
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700 text-base">
                        Current Monthly Quota
                      </Label>
                      <Input
                        readOnly
                        type="number"
                        value={formData.quota}
                        className="bg-gray-100 px-3 py-3 border border-gray-200 rounded-md w-full text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700 text-base">
                        Current Seats
                      </Label>
                      <Input
                        readOnly
                        type="number"
                        value={formData.seats}
                        className="bg-gray-100 px-3 py-3 border border-gray-200 rounded-md w-full text-base"
                      />
                    </div>
                  </div>

                  <div className="gap-4 grid grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="addQuota"
                        className="font-medium text-gray-700 text-sm"
                      >
                        Add Quota
                      </Label>
                      <Input
                        id="addQuota"
                        type="number"
                        value={formData.addQuota}
                        onChange={(e) =>
                          handleInputChange("addQuota", e.target.value)
                        }
                        placeholder="e.g. 100"
                        className="px-3 py-3 border border-gray-300 rounded-md w-full text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="removeQuota"
                        className="font-medium text-gray-700 text-sm"
                      >
                        Remove Quota
                      </Label>
                      <Input
                        id="removeQuota"
                        type="number"
                        value={formData.removeQuota}
                        onChange={(e) =>
                          handleInputChange("removeQuota", e.target.value)
                        }
                        placeholder="e.g. 50"
                        className="px-3 py-3 border border-gray-300 rounded-md w-full text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="addSeats"
                        className="font-medium text-gray-700 text-sm"
                      >
                        Add Seats
                      </Label>
                      <Input
                        id="addSeats"
                        type="number"
                        value={formData.addSeats}
                        onChange={(e) =>
                          handleInputChange("addSeats", e.target.value)
                        }
                        placeholder="e.g. 3"
                        className="px-3 py-3 border border-gray-300 rounded-md w-full text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="removeSeats"
                        className="font-medium text-gray-700 text-sm"
                      >
                        Remove Seats
                      </Label>
                      <Input
                        id="removeSeats"
                        type="number"
                        value={formData.removeSeats}
                        onChange={(e) =>
                          handleInputChange("removeSeats", e.target.value)
                        }
                        placeholder="e.g. 1"
                        className="px-3 py-3 border border-gray-300 rounded-md w-full text-base"
                      />
                    </div>
                  </div>
                </>
              )}
              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                disabled={!isFormValid}
                loadingText={isEditMode ? "Updating..." : "Adding..."}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-3 rounded-md w-full font-medium text-white text-base transition-colors disabled:cursor-not-allowed"
              >
                {isEditMode ? "Update organization" : "Add organization"}
              </LoadingButton>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
