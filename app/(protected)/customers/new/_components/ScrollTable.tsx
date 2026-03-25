export function ScrollTable({
  cols,
  maxH = "12rem",
  children,
}: {
  cols: readonly string[];
  maxH?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr>
            {cols.map((col, i) => (
              <th
                key={col}
                className={`text-xs font-medium text-gray-400 pb-3 pr-4 ${
                  i === cols.length - 1 ? "text-right pr-0" : "text-left"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="overflow-y-auto" style={{ maxHeight: maxH }}>
        <table className="w-full text-sm table-fixed">
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}

export function TRow({ children, isFirst }: { children: React.ReactNode; isFirst: boolean }) {
  return (
    <tr
      className={`hover:bg-gray-50/60 transition-colors ${
        !isFirst ? "border-t border-gray-100" : ""
      }`}
    >
      {children}
    </tr>
  );
}