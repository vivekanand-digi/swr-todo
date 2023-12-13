import React, { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    onAdd(text);
    setText("");
  };

  return (
    <form>
      <input value={text} onChange={(e) => setText(e.target.value)} autoFocus />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
