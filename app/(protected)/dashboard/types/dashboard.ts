export interface FilterOption {
  label: string;
  value: string;
  options?: string[];
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  options?: string[];
  isDatePicker?: boolean;
  onDateChange?: (date: Date) => void;
  onChange?: (value: string) => void;
}

export interface TableColumn {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
}

export interface PipelineData {
  metric: string;
  target: string;
  actual: string;
  achievement: string;
  status: string;
}

export interface ClientData {
  client: string;
  connections: string;
  conversations: string;
  meetings: string;
  conversion: string;
}

export interface CampaignData {
  campaign: string;
  client: string;
  connections: string;
  conversations: string;
  meetings: string;
  roi: string;
}

export interface TableTabsProps {
  activeTable: string;
  onTableChange: (tableId: string) => void;
}

export interface DatePickerProps {
  selected?: Date;
  onChange: (date: Date) => void;
  placeholderText?: string;
}