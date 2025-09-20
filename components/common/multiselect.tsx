import { SelectOption } from "@/lib/types/misc";
import Select from "react-select";

interface MultiSelectProps {
  label: string;
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  placeholder: string;
}
const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) => (
  <div className="space-y-2">
    <span className="text-gray-700 text-sm">{label}</span>
    <Select
      isMulti
      options={options}
      value={value}
      onChange={(val) => onChange(val as SelectOption[])}
      placeholder={placeholder}
      styles={{
        option: (base, state) => ({
          ...base,
          fontSize: "14px",
          color:
            options.find((t) => t.value === state.data.value)?.color ||
            "#374151",
        }),
        multiValueLabel: (base, state) => ({
          ...base,
          fontSize: "14px",
          color:
            options.find((t) => t.value === state.data.value)?.color ||
            "#374151",
        }),
        multiValue: (base) => ({ ...base, padding: "0 2px" }),
        placeholder: (base) => ({ ...base, fontSize: "14px" }),
      }}
    />
  </div>
);

export default MultiSelect;
