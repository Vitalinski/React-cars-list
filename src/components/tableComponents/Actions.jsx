import React from "react";

const Actions = ({ car, handleEdit, handleDelete }) => {
  const handleActionChange = (e) => {
    const action = e.target.value;
    if (action === "edit") {
      handleEdit(car);
    } else if (action === "delete") {
      handleDelete(car);
    }
  };

  return (
    <select
      onBlur={(e) => {
        e.target.value = "actions";
      }}
      onChange={handleActionChange}
    >
      <option value="actions">Select action</option>
      <option value="edit">Edit</option>
      <option value="delete">Delete</option>
    </select>
  );
};

export default Actions;
