import React from "react";
import CarTableHeader from "./CarTableHeader";
import EmptySearchMessage from "./EmptySearchMessage";

const CarTable = ({ data, handleEdit, handleDelete }) => {
  const AVAILABLE = "Available";
  const NOT_AVAILABLE = "Not available";
  if (data.length === 0) {
    
    return (
    <EmptySearchMessage/>
    );
  }
  return (
    <div>
      <table>
        <CarTableHeader />
        <tbody>
          {data.map((car) => (
            <tr key={car.id}>
              <td>{car.car}</td>
              <td>{car.car_model}</td>
              <td>{car.car_vin}</td>
              <td>{car.car_color}</td>
              <td>{car.car_model_year}</td>
              <td>{car.price}</td>
              <td>{car.availability ? AVAILABLE : NOT_AVAILABLE}</td>
              <td>
                <select
                  onBlur={(e) => {
                    e.target.value = "actions";
                  }}
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === "edit") {
                      handleEdit(car);
                    } else if (action === "delete") {
                      handleDelete(car);
                    }
                  }}
                >
                  <option value="actions">Select action</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
