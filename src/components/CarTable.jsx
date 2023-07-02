import React from "react";

const CarTable = ({ data, handleEdit, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Model</th>
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Price</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((car) => (
          <tr key={car.id}>
            <td>{car.car}</td>
            <td>{car.car_model}</td>
            <td>{car.car_vin}</td>
            <td>{car.car_color}</td>
            <td>{car.car_model_year}</td>
            <td>{car.price}</td>
            <td>{car.availability ? "Available" : "Not available"}</td>
            <td>
              <select
                onChange={(e) => {
                  const action = e.target.value;
                  if (action === "edit") {
                    handleEdit(car);
                  } else if (action === "delete") {
                    handleDelete(car);
                  }
                }}
              >
                <option value="">Actions</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
