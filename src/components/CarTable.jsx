import React, { useState, useEffect } from "react";

const CarTable = () => {
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

  //Для окна Actions
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const pageSize = 5; // Количество элементов на странице

  // Загрузка данных из локального хранилища при первом рендере
  const [carData, setCarData] = useState(() => {
    const storedData = localStorage.getItem("carData");
    return storedData ? JSON.parse(storedData) : [];
  });

  //Форма добавления автомобиля
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    car: "",
    car_model: "",
    car_vin: "",
    car_color: "",
    car_model_year: 0,
    price: '$0',
    availability: false,
  });

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewCar({
      car: "",
      car_model: "",
      car_vin: "",
      car_color: "",
      car_model_year: 0,
      price:'$0',
      availability: false,
    });
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const updateVisiblePages = () => {
    const totalVisiblePages = 5; // Количество видимых кнопок переключения страниц
    const total = Math.min(totalVisiblePages, totalPages); // Убедитесь, что не превышает общее количество страниц

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
    let previousPage;
    if (currentPage - maxVisiblePages) {
      previousPage = Math.max(currentPage - maxVisiblePages, 1);
    } else {
      previousPage = 0;
    }
    setCurrentPage(previousPage);
  };

  const goToNextPages = () => {
    const maxVisiblePages = 10;
    let nextPage;
    if (currentPage + maxVisiblePages <= totalPages) {
      nextPage = Math.min(
        currentPage + maxVisiblePages,
        totalPages - maxVisiblePages + 1
      );
    } else {
      nextPage = totalPages;
    }
    setCurrentPage(nextPage);
  };

  //Функции обработки окна Actions
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
    // Обновление данных выбранного автомобиля
    const updatedData = initialCarData.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setInitialCarData(updatedData);
    toFilterData();
    setIsEditModalOpen(false);
    localStorage.setItem("carData", JSON.stringify(updatedData));
  };

  const handleDeleteConfirm = () => {
    // Удаление выбранного автомобиля
    const updatedData = initialCarData.filter(
      (car) => car.id !== selectedCar.id
    );
    setInitialCarData(updatedData);
    toFilterData();
    setIsDeleteModalOpen(false);
    localStorage.setItem("carData", JSON.stringify(updatedData));
  };

  const handleAddSubmit = () => {
    // Добавление нового автомобиля

    if (
      newCar.car === "" ||
      newCar.car_model === ""||
      newCar.car_vin  === ""||
      newCar.car_color === ""
    ) {
      return;
    } else {
      const updatedData = [{ id: Date.now(), ...newCar }, ...initialCarData];
      setInitialCarData(updatedData);
      handleAddModalClose()
      setIsAddModalOpen(false);
      toFilterData();
      localStorage.setItem("carData", JSON.stringify(updatedData));
    }
  };

  const toFilterData = () => {
    isInit ? setIsInit(false) : setIsInit(true);
  };

  useEffect(() => {
    // Функция для получения данных из API
    if (initialCarData) {
      console.log(initialCarData.length);
    } else {
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
    // Фильтрация данных по поисковому запросу
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

    // Ограничение данных по текущей странице
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredCarData(filteredCars.slice(startIndex, endIndex));
  }, [isInit, currentPage, searchTerm]);

  useEffect(() => {
    updateVisiblePages();
  }, [currentPage, totalPages]);

  useEffect(() => {
    // Сохранение данных в локальное хранилище при изменении initialCarData
    localStorage.setItem("carData", JSON.stringify(initialCarData));
  }, [initialCarData]);

  return (
    <div>
      <button onClick={handleAdd}>Add car</button>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />

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
          {filteredCarData.map((car) => (
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

      {/* Модальное окно редактирования */}
      {isEditModalOpen && (
        <div>
          <h2>Edit Car</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Company:
              <input
                type="text"
                value={selectedCar.car}
                disabled
              />
            </label>
            <label>
              Model:
              <input type="text" value={selectedCar.car_model} 
                               disabled />
            </label>
            <label>
              VIN:
              <input type="text" value={selectedCar.car_vin} 
                               disabled />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={selectedCar.car_color}
                placeholder="Enter color"
                onChange={(e) =>
                  setSelectedCar((prevCar) => ({
                    ...prevCar,
                    car_color: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Year:
              <input type="text" value={selectedCar.car_model_year} disabled />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={selectedCar.price.slice(1)}
                onChange={(e) =>
                  setSelectedCar((prevCar) => ({
                    ...prevCar, price: '$' + e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Availability:
              <input
                type="checkbox"
                checked={selectedCar.availability}
                onChange={(e) =>
                  setSelectedCar((prevCar) => ({
                    ...prevCar,
                    availability: e.target.checked,
                  }))
                }
              />
            </label>
            <button type="submit" onClick={() => handleEditSubmit(selectedCar)}>
              Save
            </button>
            <button type="button" onClick={handleEditModalClose}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Модальное окно удаления */}
      {isDeleteModalOpen && (
        <div>
          <h2>Delete Car</h2>
          <p>Are you sure you want to delete this car?</p>
          <button type="button" onClick={handleDeleteConfirm}>
            Confirm
          </button>
          <button type="button" onClick={handleDeleteModalClose}>
            Cancel
          </button>
        </div>
      )}

      {/* Модальное окно добавления */}
      {isAddModalOpen && (
        <div>
          <h2>Add Car</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Company:
              <input
                type="text"
                placeholder="Enter company name"
                value={newCar.car}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    car: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Model:
              <input
                type="text"
                value={newCar.car_model}
                placeholder="Enter model name"

                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    car_model: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              VIN:
              <input
                type="text"
                value={newCar.car_vin}
                placeholder="Enter VIN number"

                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    car_vin: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={newCar.car_color}
                placeholder="Enter color"

                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    car_color: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Year:
              <input
                type="number"
                value={newCar.car_model_year}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    car_model_year: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={newCar.price.slice(1)}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    price: '$'+ e.target.value,
                  }))
                }
                
              />
            </label>
            <label>
              Availability:
              <input
                type="checkbox"
                checked={newCar.availability}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    availability: e.target.checked,
                  }))
                }
              />
            </label>
            <button type="submit" onClick={handleAddSubmit}>
              Add
            </button>
            <button type="button" onClick={handleAddModalClose}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div>
        <button onClick={goToPreviousPages}>&lt;</button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}

        <button onClick={goToNextPages}>&gt;</button>
      </div>
    </div>
  );
};

export default CarTable;
