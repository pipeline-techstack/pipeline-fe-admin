declare module "react-date-range" {
  import * as React from "react";

  export interface Range {
    startDate?: Date;
    endDate?: Date;
    key?: string;
    color?: string;
  }

  export interface DateRangePickerProps {
    ranges: Range[];
    onChange: (ranges: { [key: string]: Range }) => void;
    showSelectionPreview?: boolean;
    moveRangeOnFirstSelection?: boolean;
    months?: number;
    direction?: "horizontal" | "vertical";
    className?: string;
  }

  export interface ExtraDateRangePickerProps {
    editableDateInputs?: boolean;
    showMonthAndYearPickers?: boolean;
    rangeColors?: string[];
  }

  export class DateRangePicker extends React.Component<DateRangePickerProps> {}
}
