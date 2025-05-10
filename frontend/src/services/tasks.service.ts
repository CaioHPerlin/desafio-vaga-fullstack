// services/tasks.service.ts
import { api } from "@/lib/axios";
import { handleApiError } from "@/lib/utils";
import type {
  CreateTaskDto,
  Task,
  TaskFilterDto,
  UpdateTaskDtop,
} from "@/types/tasks.types";

export const tasksService = {
  async create(taskData: CreateTaskDto): Promise<Task> {
    try {
      const response = await api.post("/tasks", taskData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async findAll(filters?: TaskFilterDto): Promise<Task[]> {
    try {
      const response = await api.get("/tasks", { params: filters });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async findOne(id: number): Promise<Task> {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async update(id: number, taskData: UpdateTaskDtop): Promise<Task> {
    try {
      const response = await api.patch(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async remove(id: number): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
