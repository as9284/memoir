import React from "react";

export const Confirmation = ({ onConfirm, onCancel }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onCancel();
    }
  };

  return (
    <>
      <div
        id="modal-backdrop"
        onClick={handleOutsideClick}
        className="fixed w-full min-h-dvh bg-memoir-dark/60 flex flex-col justify-center items-center select-none"
      >
        <div className="relative w-80 h-48 bg-memoir-light drop-shadow-lg rounded-xl flex flex-col justify-center items-center gap-2 p-4 text-center dark:bg-memoir-darker">
          <h3 className="text-2xl font-bold">Delete Note</h3>
          <p>Are you sure you want to delete this note?</p>
          <div className="w-full flex justify-center items-center gap-2">
            <button
              className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
