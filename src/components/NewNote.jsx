import React, { useRef } from "react";

export const NewNote = ({ addNote, closeModal }) => {
  const titleRef = useRef();

  const handleCreate = () => {
    const title = titleRef.current.value;
    addNote(title);
    closeModal();
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      closeModal();
    }
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleOutsideClick}
      className="fixed w-full min-h-dvh bg-memoir-dark/60 flex flex-col justify-center items-center select-none"
    >
      <div className="relative w-80 h-56 bg-memoir-light drop-shadow-lg rounded-xl flex flex-col justify-center items-center gap-2 dark:bg-memoir-darker">
        <h3 className="text-2xl font-bold">New Note</h3>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h4 className="w-72">Title</h4>
          <input
            ref={titleRef}
            className="w-72 h-12 rounded-md indent-3 bg-memoir-dark text-memoir-light shadow-md placeholder:text-neutral-300"
            type="text"
            name="title"
            placeholder="Enter the note title"
          />
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <button
            className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
            onClick={handleCreate}
          >
            Create
          </button>
          <button
            className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
