"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  onClick?: (id: string) => void;
  data: Song;
}

export default function MediaItem({ onClick, data }: MediaItemProps) {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: Default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md hover:bg-neutral-800/50"
    >
      <div className="relative h-[60px] w-[60px] overflow-hidden rounded-md">
        <Image
          src={imageUrl || "/images/liked.png"}
          alt="image"
          width={85}
          height={85}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1 overflow-hidden">
        <p className="truncate text-white">{data.title}</p>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </div>
  );
}
