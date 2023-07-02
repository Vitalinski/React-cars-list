import React from "react";

const DeleteCarModal = ({ isOpen, onClose, onConfirm, selectedCar  }) => {
  return (
    <div>
      {isOpen && (
        <div>
          <h2>Delete Car</h2>
          <p>Are you sure you want to delete {selectedCar.car} {selectedCar.car_model}?</p>
          <button type="button" onClick={onConfirm}>
            Confirm
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteCarModal;
