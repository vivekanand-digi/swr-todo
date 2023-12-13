import React from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { getTodos, addTodo, deleteTodo } from "./api/api"; 
import TodoForm from "./pages/TodoForm";
import TodoList from "./pages/TodoList";

const App = () => {
  const { data, mutate } = useSWR("/api/todos", getTodos);

  const handleAddTodo = async (text) => {
    const newTodo = {
      id: Date.now(),
      text,
    };

    try {
      await mutate(addTodo(newTodo), {
        optimisticData: [...data, newTodo],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Successfully added the new item.");
    } catch (e) {
      toast.error("Failed to add the new item.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // Delete the todo using the deleteTodo API function
      await mutate(deleteTodo(id), {
        optimisticData: data.filter((todo) => todo.id !== id), // Optimistically remove the todo from the current data
        rollbackOnError: true,
        revalidate: false,
      });
      toast.success("Successfully deleted the item.");
    } catch (error) {
      toast.error("Failed to delete the item.");
    }
  };

  return (
    <div>
      <Toaster toastOptions={{ position: "bottom-center" }} />
      <h1>Todos </h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={data || []} onDelete={handleDeleteTodo} />
    </div>
  );
};

export default App;

