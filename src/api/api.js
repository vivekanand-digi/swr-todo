import axios from "axios";
import { mutate } from "swr";

const apiUrl = "http://localhost:3002"; // Change the port if your JSON Server is running on a different port

export async function getTodos() {
  const response = await axios.get(`${apiUrl}/todos`);
  return response.data;
}

export async function addTodo(todo) {
  try {
    const response = await axios.post(`${apiUrl}/todos`, todo);

    if (!response.data) {
      throw new Error("Failed to add new item!");
    }

    const updatedTodo = response.data;

    // Use the callback function with mutate to ensure you're working with the most up-to-date data
    mutate("/api/todos", (currentData) => {
      // Append the new todo to the existing array of todos
      const updatedData = Array.isArray(currentData) ? [...currentData, updatedTodo] : [updatedTodo];
      return updatedData;
    }, false);

    return updatedTodo;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

export async function deleteTodo(id) {
  try {
    await axios.delete(`${apiUrl}/todos/${id}`);
    const updatedTodos = await getTodos();
    // Update the cache with the new data
    mutate("/api/todos", updatedTodos, false);

    return updatedTodos;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}
