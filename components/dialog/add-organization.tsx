"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Edit } from "lucide-react";
import { Plus, Users, X } from "lucide-react";
import { addOrganization } from "@/lib/api";
import { OrganizationFormData } from "@/lib/types/org-types";
import { useQueryClient } from "@tanstack/react-query";
import { editOrganization } from "@/lib/api";

interface AddOrganizationDialogProps {
  open: boolean;
  onClose: () => void;
  defaultValues?: {
    id?: string;
    organizationName: string;
    email: string;
    quota: string;
    enterpriseId?: string;
  };
  isEditMode?: boolean;
}

export function AddOrganizationDialog({
  open,
  onClose,
  defaultValues,
  isEditMode,
}: AddOrganizationDialogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<OrganizationFormData>({
  organizationName: defaultValues?.organizationName || "",
  enterpriseId: defaultValues?.enterpriseId || `${process.env.NEXT_PUBLIC_PRICE_ID}`,
  email: defaultValues?.email || "",
  quota: defaultValues?.quota || "",
});
 
useEffect(() => {
  if (defaultValues) {
    setFormData({
      organizationName: defaultValues.organizationName || "",
      enterpriseId: defaultValues.enterpriseId || `${process.env.NEXT_PUBLIC_PRICE_ID}`,
      email: defaultValues.email || "",
      quota: defaultValues.quota || "",
    });
  }
}, [defaultValues]);


  const [emailTouched, setEmailTouched] = useState(false);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleInputChange = (
    field: keyof OrganizationFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && defaultValues?.id) {
  await editOrganization({
    id: defaultValues.id,
    name: formData.organizationName,
    email: formData.email,
    quota: formData.quota,
  });
} else {
  await addOrganization(formData);
}

      setFormData({
        organizationName: "",
        enterpriseId: `${process.env.NEXT_PUBLIC_PRICE_ID}`, //this will be hard coded
        email: "",
        quota: "",
      });
      setEmailTouched(false);
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      organizationName: "",
      enterpriseId: `${process.env.NEXT_PUBLIC_PRICE_ID}`, //this will be hard coded
      email: "",
      quota: "",
    });
    setEmailTouched(false);
  };

  const isFormValid =
    formData.organizationName &&
    formData.enterpriseId &&
    isEmailValid &&
    formData.quota;

  return (
    <>
      {!isEditMode && (
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => onClose()}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add Organization
        </Button>
      )}

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
                    {isEditMode ? 'Edit organization' : 'Add enterprise organization'}
                  </h2>
                  <p className="mt-1 text-gray-600 text-sm">
                    {isEditMode 
                      ? 'Update organization details and settings'
                      : 'Enterprise organization model & value proposition'
                    }
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
                  className="px-3 py-3 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base bg-gray-50"
                />
              </div>

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
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                  onChange={(e) => handleInputChange("quota", e.target.value)}
                  className="px-3 py-3 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-3 rounded-md w-full font-medium text-white text-base transition-colors disabled:cursor-not-allowed"
              >
                {isEditMode ? 'Update organization' : 'Add organization'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}