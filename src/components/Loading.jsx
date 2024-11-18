import React from "react";
import "ldrs/infinity";

export const Loading = () => {
  return (
    <div className="w-full min-h-dvh flex items-center justify-center bg-memoir-light z-50">
      <div className="text-lg font-semibold">
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="black"
        ></l-infinity>
      </div>
    </div>
  );
};
