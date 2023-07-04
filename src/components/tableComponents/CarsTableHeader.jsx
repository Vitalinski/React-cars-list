const CarsTableHeader = () => {
  const HEADERS = [
    "Company",
    "Model",
    "VIN",
    "Color",
    "Year",
    "Price",
    "Availability",
    "Actions",
  ];

  return (
    <thead>
      <tr>
        {HEADERS.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};
export default CarsTableHeader;
