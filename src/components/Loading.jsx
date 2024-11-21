import React from "react";

export const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-memoir-darker z-[9999]">
      <div className="text-lg font-semibold">
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.3"
          speed="1.3"
          color="white"
        ></l-infinity>
      </div>
    </div>
  );
};
