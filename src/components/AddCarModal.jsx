import React, { useState } from "react";

const AddCarModal = ({  isOpen, onClose, onSubmit }) => {

  const DEFAULT_CAR_MODEL = {
    car: "",
    car_model: "",
    car_vin: "",
    car_color: "",
    car_model_year: 0,
    price: "$0",
    availability: false,
  };

  const [isFieldsEmpty, setIsFieldsEmpty]= useState(false)
  const [newCar, setNewCar] = useState(DEFAULT_CAR_MODEL);
  
  const handleInputChange = (e) => {
  const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(newCar).some((car) => car === ''||car === ' ')){
      setIsFieldsEmpty(true)

    }
    else{
    onSubmit(newCar);
    setNewCar(DEFAULT_CAR_MODEL);
        setIsFieldsEmpty(false)

    }
    
  };
  const handleClose = (e) => {
    e.preventDefault();
    setNewCar(DEFAULT_CAR_MODEL);
    setIsFieldsEmpty(false)

    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-window">
          <div className="modal-window-content">
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
                      car: e.target.value.replace(/\s+/g, ' '),
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
                      car_model: e.target.value.replace(/\s+/g, ' '),
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
                      car_vin: e.target.value.replace(/\s+/g, ' '),
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
                      car_color: e.target.value.replace(/\s+/g, ' '),
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
                      price: e.target.value > 0 ? "$" + e.target.value : "$0",
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
              {isFieldsEmpty && (
                <div className="error-message">*All fields required</div>
              )}
              <button type="submit" onClick={handleSubmit}>
                Add
              </button>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCarModal;
