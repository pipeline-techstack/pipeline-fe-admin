"use client";
import React from "react";
import { Pencil } from "lucide-react";
 
interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onEdit?: () => void;
  editLabel?: string;
  children: React.ReactNode;
  className?: string;
}
 
export default function SectionCard({
  title,
  subtitle,
  icon,
  onEdit,
  editLabel = "Edit",
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div
      className={`border border-gray-200 rounded-lg bg-white overflow-hidden ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-50 text-gray-500 shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-sm text-secondary-foreground">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 rounded-md px-2.5 py-1.5 transition-all duration-150 font-medium"
          >
            <Pencil className="w-3 h-3" />
            {editLabel}
          </button>
        )}
      </div>
 
      {/* Card Content */}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
 
/* ─── Sub-components for common patterns ─── */
 
/** A labeled field used inside SectionCard */
export function FieldItem({
  label,
  value,
  classNameLable,
  classNameValue,
  children,
}: {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
  classNameLable?: string;
  classNameValue?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-sm text-muted-foreground ${classNameLable}`}>{label}</span>
      {children ? (
        children
      ) : (
        <span className={`text-sm text-secondary-foreground  ${classNameValue}`}>
          {value ?? <span className="">—</span>}
        </span>
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
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "success" | "warning" | "info" | "outline";
}) {
  const styles = {
    default: "bg-gray-100 text-gray-600 w-fit rounded-full text-[14px]",
    success: "bg-green-50 text-green-700 border border-green-200 w-fit rounded-full text-[14px]",
    warning: "bg-amber-50 text-amber-700 border border-amber-200 w-fit rounded-full text-[14px]",
    info: "bg-blue-50 text-blue-700 border border-blue-200 w-fit rounded-full text-[14px]",
    outline: "bg-white text-gray-600 border border-gray-300 w-fit rounded-full text-[14px]",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded ${styles[variant]}`}
    >
      {label}
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
    ghost:
      "text-gray-500 hover:text-gray-800 hover:bg-gray-100",
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