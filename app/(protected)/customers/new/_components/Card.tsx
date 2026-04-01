"use client";
import React, { useState } from "react";
import { Check, Copy, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { copyToClipboard } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  isEditing?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  onEdit?: () => void;
  editLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  subtitle,
  icon,
  isEditing = false,
  onEdit,
  onCancel,
  onSave,
  editLabel = "Edit",
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div
      className={`border border-gray-200 rounded-lg bg-white overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start px-5 py-4 border-gray-100 border-b">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="flex justify-center items-center bg-gray-50 rounded-md w-7 h-7 text-gray-500 shrink-0">
              {icon}
            </div>
          )}

          <div>
            <h3 className="text-secondary-foreground text-sm">{title}</h3>
            {subtitle && (
              <p className="mt-0.5 text-muted-foreground text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {!isEditing ? (
            onEdit && (
              <Button size="sm" variant="outline" onClick={onEdit}>
                <Pencil className="mr-1 w-4 h-4" />
                {editLabel}
              </Button>
            )
          ) : (
            <>
              {onCancel && (
                <Button size="sm" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              {onSave && (
                <Button size="sm" variant="default" onClick={onSave}>
                  Save
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

/* ─── Sub-components for common patterns ─── */

/** A labeled field used inside SectionCard */
export function FieldItem({
  label,
  value,
  name,
  isEditing,
  onChange,
  classNameLable,
  classNameValue,
  children,
  isCopy,
}: {
  label: string;
  value?: React.ReactNode;
  name?: string;
  isEditing?: boolean;
  onChange?: (name: string, value: string) => void;
  children?: React.ReactNode;
  classNameLable?: string;
  classNameValue?: string;
  isCopy?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(String(value));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-sm text-muted-foreground ${classNameLable}`}>
        {label}
      </span>

      {isEditing && name ? (
        <input
          value={value as string}
          onChange={(e) => onChange?.(name, e.target.value)}
          className="px-2 py-1 border rounded text-sm"
        />
      ) : children ? (
        children
      ) : (
        <div className="flex items-center gap-2">
          <span
            title={typeof value === "string" ? value : ""}
            className={`text-sm text-secondary-foreground truncate ${classNameValue}`}
          >
            {value ?? "—"}
          </span>

          {isCopy && value && (
            <button
              onClick={handleCopy}
              className="hover:bg-muted p-1 rounded transition"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** A grid of FieldItems – 3 columns by default */
export function FieldGrid({
  children,
  cols = 3,
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
}) {
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  return (
    <div className={`grid ${colMap[cols]} gap-x-8 gap-y-5`}>{children}</div>
  );
}

/** A simple inline badge */
export function Badge({
  logo,
  label,
  variant = "default",
  className,
  disabled = false,
}: {
  label: string;
  variant?: "default" | "success" | "warning" | "info" | "outline";
  className?: string;
  disabled?: boolean;
  logo?: React.ReactNode;
}) {
  const styles = {
    default: "bg-gray-100 text-gray-600",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-red-50 text-red-700 border border-red-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
    outline: "bg-white text-gray-600 border border-gray-300",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full w-fit text-sm",
        styles[variant],
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      {logo && <span className="mr-1">{logo}</span>}
      <span>{label}</span>
    </span>
  );
}

/** A table row inside a SectionCard table */
export function TableRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`border-t border-gray-100 hover:bg-gray-50/60 transition-colors ${className}`}
    >
      {children}
    </tr>
  );
}

/** A simple action text button */
export function ActionButton({
  label,
  icon,
  onClick,
  variant = "ghost",
}: {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "outline";
}) {
  const base =
    "inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-2.5 py-1.5 transition-all duration-150 cursor-pointer";
  const styles = {
    ghost: "text-gray-500 hover:text-gray-800 hover:bg-gray-100",
    outline:
      "text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {icon}
      {label}
    </button>
  );
}
