import api from "../api";

export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener tareas");
  }
};

export const createTask = async (title: string, description: string) => {
  try {
    const response = await api.post("/tasks", { title, description });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear tarea");
  }
};

export const updateTask = async (
  id: string,
  title: string,
  description: string
) => {
  try {
    const response = await api.put(`/tasks/${id}`, { title, description });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar tarea");
  }
};

export const deleteTask = async (id: string) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error("Error al eliminar tarea");
  }
};
