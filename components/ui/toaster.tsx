"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  const getIcon = (variant: "default" | "success" | "destructive" | "warning" | null | undefined) => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />;
      case "destructive":
        return <XCircle className="h-5 w-5 text-red-600 mt-0.5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />;
      default:
        return <Info className="h-5 w-5 text-gray-400 mt-0.5" />;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="flex items-start gap-3">
            {getIcon(variant)}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
