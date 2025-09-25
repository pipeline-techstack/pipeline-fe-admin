export type SelectOption = {
  label: string;
  value: string;
  color?: string;
};
export interface SelectedOption extends SelectOption {
  type: "include" | "exclude";
}

