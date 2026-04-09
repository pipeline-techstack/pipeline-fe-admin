"use client"

import { useRouter } from "next/navigation";
import RevopsTable from "./RevopsTable";

export function RevopsSection({ configKey, config, id, name, email, handlers }) {
  const query = config.hook(id);
  const router = useRouter();

  const handleViewMore = () => {
    router.push(
      `/customers/new/${id}/revops/${config.route}?name=${name}&email=${email}`
    );
  };

  const columns =
    typeof config.getColumns === "function"
      ? configKey === "workbooks"
        ? config.getColumns(handlers.handleCostClick, handlers.handleDuplicate)
        : configKey === "campbooks"
          ? config.getColumns(handlers.handleEditCampbook, () => {})
          : config.getColumns(handlers.handleView, () => {})
      : config.getColumns;

  return (
    <RevopsTable
      title={config.title}
      subtitle={config.subtitle}
      icon={config.icon}
      data={query.data?.[config.dataKey] ?? []}
      loading={query.isLoading}
      columns={columns}
      handleViewMore={handleViewMore}
      onEdit={configKey === "campbooks" ? handlers.handleCreateCampbook : undefined}
      editLabel={configKey === "campbooks" ? "Create" : undefined}
    />
  );
}
