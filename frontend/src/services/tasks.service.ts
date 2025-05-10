// services/tasks.service.ts
import { api } from "@/lib/axios";
import { handleApiError } from "@/lib/utils";
import type {
  CreateTaskDto,
  Task,
  TaskFilterDto,
  UpdateTaskDto,
} from "@/types/tasks.types";

export const tasksService = {
  async create(taskData: CreateTaskDto): Promise<Task> {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
          throw new Error("");
      const response = await api.post("/tasks", taskData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async findAll(filters?: TaskFilterDto): Promise<Task[]> {
    // Remove undefined values from filters
    const params = Object.fromEntries(
      Object.entries(filters || {}).filter(([_, value]) => value !== undefined)
    );

    const response = await api.get("/tasks", { params });
    return response.data;
  },

  async findOne(id: number): Promise<Task> {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async update(id: number, taskData: UpdateTaskDto): Promise<Task> {
        await new Promise((resolve) => setTimeout(resolve, 3000));
          throw new Error("");
    try {
      const response = await api.patch(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async remove(id: number): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 3000));
          throw new Error("");
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
