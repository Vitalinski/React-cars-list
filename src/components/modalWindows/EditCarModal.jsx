import React from "react";

const EditCarModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedCar,
  handleInputChange,
}) => {
  return (
    <div>
      {isOpen && (
        <div className="modal-window">
          <div className="modal-window-content">
            <h2>Edit Car</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                Company:
                <input type="text" value={selectedCar.car} disabled />
              </label>
              <label>
                Model:
                <input type="text" value={selectedCar.car_model} disabled />
              </label>
              <label>
                VIN:
                <input type="text" value={selectedCar.car_vin} disabled />
              </label>
              <label>
                Color:
                <input
                  type="text"
                  value={selectedCar.car_color}
                  placeholder="Enter color"
                  onChange={(e) =>
                    handleInputChange(
                      "car_color",
                      e.target.value.replace(/\s+/g, " ")
                    )
                  }
                />
              </label>
              <label>
                Year:
                <input
                  type="text"
                  value={selectedCar.car_model_year}
                  disabled
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={selectedCar.price.slice(1)}
                  onChange={(e) =>
                    handleInputChange(
                      "price",
                      e.target.value > 0 ? "$" + e.target.value : "$0"
                    )
                  }
                />
              </label>
              <label>
                Availability:
                <input
                  type="checkbox"
                  checked={selectedCar.availability}
                  onChange={(e) =>
                    handleInputChange("availability", e.target.checked)
                  }
                />
              </label>
              <button type="button" onClick={() => onSubmit(selectedCar)}>
                Save
              </button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCarModal;
