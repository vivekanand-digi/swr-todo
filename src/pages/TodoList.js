import React from "react";

const TodoList = ({ todos, onDelete }) => {
  const handleDelete = (id) => {
    // Call the onDelete callback with the id of the todo to be deleted
    onDelete(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
