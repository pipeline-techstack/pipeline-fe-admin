
import { SelectOption } from "@/lib/types/misc";
import MultiSelect from "./multiselect";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// ----------------- Async MultiSelect Wrapper -----------------
interface AsyncFilterProps {
  label: string;
  queryKey: string[];
  queryFn: () => Promise<SelectOption[]>;
  selected: SelectOption[];
  onChange: (val: SelectOption[]) => void;
  enabled: boolean;
  onOptionsLoad: (options: SelectOption[]) => void;
}
const AsyncMultiSelect = ({
  label,
  queryKey,
  queryFn,
  selected,
  onChange,
  enabled,
  onOptionsLoad,
}: AsyncFilterProps) => {
  const { data = [], isLoading } = useQuery<SelectOption[]>({
    queryKey,
    queryFn,
    enabled,
  });

  useEffect(() => {
    if (data.length > 0) onOptionsLoad(data);
  }, [data, onOptionsLoad]);

  if (isLoading)
    return (
      <div className="space-y-2">
        <span className="text-gray-700 text-sm">{label}</span>
      </div>
    );

  return (
    <MultiSelect
      label={label}
      options={data}
      value={selected}
      onChange={onChange}
      placeholder={`Select ${label.toLowerCase()}...`}
    />
  );
};

export default AsyncMultiSelect;