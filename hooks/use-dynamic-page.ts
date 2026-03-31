import { useEffect, useState } from "react";

export function useDynamicPageSize({
  rowHeight = 48, // approximate height of one row (px)
  min = 20,
  max = 80,
  offset = 220, // header + footer + padding space
}: {
  rowHeight?: number;
  min?: number;
  max?: number;
  offset?: number;
}) {
  const [pageSize, setPageSize] = useState(min);

  useEffect(() => {
    const calculate = () => {
      const viewportHeight = window.innerHeight;

      const availableHeight = viewportHeight - offset;
      const rows = Math.floor(availableHeight / rowHeight);

      const clamped = Math.max(min, Math.min(max, rows));

      setPageSize(clamped);
    };

    calculate();
    window.addEventListener("resize", calculate);

    return () => window.removeEventListener("resize", calculate);
  }, [rowHeight, min, max, offset]);

  return pageSize;
}