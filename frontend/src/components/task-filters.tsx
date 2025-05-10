// components/task-filters.tsx
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatusToReadable } from "@/types/tasks.types";
import type { TaskFilterDto } from "@/types/tasks.types";

interface TaskFiltersProps {
  filters: Partial<TaskFilterDto>;
  onFilterChange: <K extends keyof TaskFilterDto>(
    key: K,
    value: TaskFilterDto[K] | undefined
  ) => void;
  onReset: () => void;
}

export function TaskFilters({
  filters,
  onFilterChange,
  onReset,
}: TaskFiltersProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-4 mb-6">
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFilterChange("status", value as TaskFilterDto["status"])
        }
      >
        <SelectTrigger className="flex-1 sm:flex-initial">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null as any}>Todos</SelectItem>
          {Object.entries(TaskStatusToReadable).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sortBy}
        onValueChange={(value) =>
          onFilterChange("sortBy", value as TaskFilterDto["sortBy"])
        }
      >
        <SelectTrigger className="flex-1 sm:flex-initial">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Data de criação</SelectItem>
          <SelectItem value="updatedAt">Data de atualização</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.order}
        onValueChange={(value) =>
          onFilterChange("order", value as TaskFilterDto["order"])
        }
      >
        <SelectTrigger className="flex-1 sm:flex-initial">
          <SelectValue placeholder="Ordem" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ASC">Crescente</SelectItem>
          <SelectItem value="DESC">Decrescente</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onReset}>
        Limpar filtros
      </Button>
    </div>
  );
}
