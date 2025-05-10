// hooks/useTaskFilters.ts
import { useState } from "react";
import type { TaskFilterDto } from "@/types/tasks.types";

export function useTaskFilters(initialFilters?: Partial<TaskFilterDto>) {
  const [filters, setFilters] = useState<Partial<TaskFilterDto>>({
    status: undefined,
    sortBy: "createdAt",
    order: "DESC",
    ...initialFilters,
  });

  const updateFilter = <K extends keyof TaskFilterDto>(
    key: K,
    value: TaskFilterDto[K] | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: undefined,
      sortBy: "createdAt",
      order: "DESC",
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
  };
}
