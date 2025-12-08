import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  onClick?: () => void;
}

export function LoadingButton({
  isLoading,
  disabled,
  children,
  loadingText,
  className = '',
  type = 'button',
  variant = 'default',
  size = 'default',
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${className} ${isLoading ? 'cursor-not-allowed' : ''}`}
    >
      {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}

// Usage examples in your forms:
export function ExampleUsage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4 p-6">
      <h3 className="font-semibold text-lg">Loading Button Example</h3>
      
      {/* Add Organization Button */}
      <LoadingButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Adding organization..."
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 w-full text-white"
      >
        Add Organization
      </LoadingButton>

      {/* Edit Organization Button */}
      <LoadingButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Updating organization..."
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 w-full text-white"
      >
        Update Organization
      </LoadingButton>

      {/* Add Team Member Button */}
      <LoadingButton
        isLoading={isSubmitting}
        loadingText="Adding member..."
        onClick={handleSubmit}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Add Member
      </LoadingButton>

      {/* Cancel Button (doesn't need loading state) */}
      <Button
        variant="outline"
        disabled={isSubmitting}
        className="flex-1 hover:bg-gray-100 border-gray-300 text-gray-900"
      >
        Cancel
      </Button>
    </div>
  );
}