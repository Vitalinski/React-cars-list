import React from "react";
import Select from "react-select";

const Actions = ({ car, handleEdit, handleDelete }) => {
  const handleActionChange = (selectedOption) => {
    const action = selectedOption.value;
    if (action === "edit") {
      handleEdit(car);
    } else if (action === "delete") {
      handleDelete(car);
    }
    action = "select action";
  };

  const options = [
    { value: "edit", label: "Edit" },
    { value: "delete", label: "Delete" },
  ];

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    menu: (provided) => ({
      ...provided,
    }),
  };

  return (
    <Select
      options={options}
      defaultValue={{ value: "select action", label: "Select action" }}
      onChange={handleActionChange}
      styles={selectStyles}
      isSearchable={false}
    />
  );
};

export default Actions;
