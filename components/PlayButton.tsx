import { FaPlay } from "react-icons/fa";

export default function PlayButton() {
  return (
    <button className="flex translate-y-1/2 items-center justify-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition hover:scale-105 group-hover:opacity-100">
      <FaPlay className="ml-0.5 text-black" />
    </button>
  );
}
