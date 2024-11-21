import React from "react";

export const Header = ({ toggleModal, toggleSettings }) => {
  return (
    <>
      <div className="w-full h-24 flex flex-col justify-center items-center gap-4 my-6 select-none">
        <h1 className="text-3xl md:text-5xl font-bold">Memoir</h1>
        <div className="w-full flex justify-center items-center gap-2">
          <button onClick={toggleModal} className="memoir-header-btn">
            New
          </button>
          <button className="memoir-header-btn" onClick={toggleSettings}>
            Settings
          </button>
        </div>
      </div>
    </>
  );
};
