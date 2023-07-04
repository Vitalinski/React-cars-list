import React from "react";
import Actions from "./Actions";
const CarsTableBody = ({
  data,
  handleEdit,
  handleDelete,
  AVAILABLE,
  NOT_AVAILABLE,
}) => {
  return (
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
            <Actions
              car={car}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CarsTableBody;
