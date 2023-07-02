import "./App.css";
import CarTable from "./components/CarTable";
import React, { useState, useEffect } from "react";
import AddCarModal from "./components/AddCarModal";
import DeleteCarModal from "./components/DeleteCarModal";
import EditCarModal from "./components/EditCarModal";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

const App = () => {
  const [initialCarData, setInitialCarData] = useState(() => {
    const storedData = localStorage.getItem("carData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const pageSize = 5;

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSearch = (value) => {
  
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const updateVisiblePages = () => {
    const totalVisiblePages = 5;
    const total = Math.min(totalVisiblePages, totalPages);

    let startPage = currentPage - Math.floor(total / 2);
    startPage = Math.max(startPage, 1);
    startPage = Math.min(startPage, totalPages - total + 1);

    const visiblePageNumbers = Array.from(
      { length: total },
      (_, index) => startPage + index
    );

    setVisiblePages(visiblePageNumbers);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPages = () => {
    const maxVisiblePages = 10;
    let previousPage = currentPage - maxVisiblePages;
    if (previousPage <= 0) {
      previousPage = 1;
    }
    setCurrentPage(previousPage);
  };

  const goToNextPages = () => {
    const maxVisiblePages = 10;
    let nextPage = currentPage + maxVisiblePages;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }
    setCurrentPage(nextPage);
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setIsEditModalOpen(true);
  };

  const handleDelete = (car) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditSubmit = (updatedCar) => {
    const updatedData = initialCarData.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setInitialCarData(updatedData);
    toFilterData();
    setIsEditModalOpen(false);
    localStorage.setItem("carData", JSON.stringify(updatedData));
  };

  const handleDeleteConfirm = () => {
    const updatedData = initialCarData.filter(
      (car) => car.id !== selectedCar.id
    );
    setInitialCarData(updatedData);
    toFilterData();
    setIsDeleteModalOpen(false);
    localStorage.setItem("carData", JSON.stringify(updatedData));
  };

  const handleAddSubmit = (newCar) => {
    if (
      newCar.car === "" ||
      newCar.car_model === "" ||
      newCar.car_vin === "" ||
      newCar.car_color === ""
    ) {
      return;
    } else {
      const updatedData = [{ id: Date.now(), ...newCar }, ...initialCarData];
      setInitialCarData(updatedData);
      handleAddModalClose();
      setIsAddModalOpen(false);
      toFilterData();
      localStorage.setItem("carData", JSON.stringify(updatedData));
    }
  };

  const toFilterData = () => {
    setIsInit((prevState) => !prevState);
  };

  useEffect(() => {
    if (!initialCarData) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://myfakeapi.com/api/cars/");
          if (response.ok) {
            const data = await response.json();
            setInitialCarData(data.cars);
            toFilterData();
          } else {
            console.error("Error:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    const filteredCars = initialCarData.filter((car) => {
      const searchFields = [
        car.car,
        car.car_model,
        car.car_vin,
        car.car_color,
        car.price,
        car.car_model_year.toString(),
        car.availability ? "available" : "not available",
      ];
      return searchFields.some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setTotalPages(Math.ceil(filteredCars.length / pageSize));

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredCarData(filteredCars.slice(startIndex, endIndex));
  }, [isInit, currentPage, searchTerm]);

  useEffect(() => {
    updateVisiblePages();
  }, [currentPage, totalPages]);

  useEffect(() => {
    localStorage.setItem("carData", JSON.stringify(initialCarData));
  }, [initialCarData]);

  return (
    <div>
      <AddCarModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleAddSubmit}
      />
      <button onClick={handleAdd}>Add Car</button>

      <Search value={searchTerm} onChange={handleSearch} />

      <CarTable
        data={filteredCarData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <EditCarModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditSubmit}
        selectedCar={selectedCar}
        handleInputChange={(field, value) =>
          setSelectedCar((prevCar) => ({ ...prevCar, [field]: value }))
        }
      />

      <DeleteCarModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        selectedCar={selectedCar}
      />
      <Pagination
        currentPage={currentPage}
        visiblePages={visiblePages}
        goToPreviousPages={goToPreviousPages}
        handlePageChange={handlePageChange}
        goToNextPages={goToNextPages}
      />
    </div>
  );
};

export default App;
