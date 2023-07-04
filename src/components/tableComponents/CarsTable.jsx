import React from "react";
import CarsTableHeader from "./CarsTableHeader";
import EmptySearchMessage from "../EmptySearchMessage";
import CarsTableBody from "./CarsTableBody";

const CarsTable = ({ data, handleEdit, handleDelete }) => {
  const AVAILABLE = "Available";
  const NOT_AVAILABLE = "Not available";
  if (data.length === 0) {
    return <EmptySearchMessage />;
  }
  return (
    <div>
      <table>
        <CarsTableHeader />
        <CarsTableBody
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          AVAILABLE={AVAILABLE}
          NOT_AVAILABLE={NOT_AVAILABLE}
        />
      </table>
    </div>
  );
};

export default CarsTable;
