import React, { useState, useEffect } from "react";

const CarTable = () => {
  const [initialCarData, setInitialCarData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);

  //Для окна Actions
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const pageSize = 5; // Количество элементов на странице

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch("https://myfakeapi.com/api/cars/");
        if (response.ok) {
          const data = await response.json();
          setInitialCarData(data.cars);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
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
  }, [currentPage, searchTerm]);

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

  useEffect(() => {
    updateVisiblePages();
  }, [currentPage, totalPages]);

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

  //Форма добавления автомобиля
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    company: "",
    model: "",
    vin: "",
    color: "",
    year: 0,
    price: 0,
    availability: false,
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewCar({
      company: "",
      model: "",
      vin: "",
      color: "",
      year: 0,
      price: 0,
      availability: false,
    });
  };

  const [carData, setCarData] = useState(() => {
    // Загрузка данных из локального хранилища при первом рендере
    const storedData = localStorage.getItem("carData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    // Сохранение данных в локальное хранилище при изменении carData
    localStorage.setItem("carData", JSON.stringify(carData));
  }, [carData]);

  const handleEditSubmit = (updatedCar) => {
    // Обновление данных выбранного автомобиля
    const updatedData = initialCarData.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setInitialCarData(updatedData);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Удаление выбранного автомобиля
    const updatedData = initialCarData.filter(
      (car) => car.id !== selectedCar.id
    );
    setInitialCarData(updatedData);
    setIsDeleteModalOpen(false);
    console.log(initialCarData.length);
  };

  const handleAddSubmit = (newCar) => {
    // Добавление нового автомобиля
    const updatedData = [...initialCarData, { id: Date.now(), ...newCar }];
    setInitialCarData(updatedData);
    setIsAddModalOpen(false);
  };

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
              <input type="text" value={selectedCar.company} disabled />
            </label>
            <label>
              Model:
              <input type="text" value={selectedCar.model} disabled />
            </label>
            <label>
              VIN:
              <input type="text" value={selectedCar.vin} disabled />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={selectedCar.color}
                onChange={(e) =>
                  setSelectedCar((prevCar) => ({
                    ...prevCar,
                    color: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={selectedCar.price}
                onChange={(e) =>
                  setSelectedCar((prevCar) => ({
                    ...prevCar,
                    price: e.target.value,
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
                value={newCar.company}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    company: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Model:
              <input
                type="text"
                value={newCar.model}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    model: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              VIN:
              <input
                type="text"
                value={newCar.vin}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    vin: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={newCar.color}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    color: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Year:
              <input
                type="number"
                value={newCar.year}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    year: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={newCar.price}
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    price: e.target.value,
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
