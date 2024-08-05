"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

export default function Library() {
  const onClick = () => {
    // Handle upload later
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-cen gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 text-medium text-md">Your library</p>
        </div>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4">List of songs</div>
    </div>
  );
}
