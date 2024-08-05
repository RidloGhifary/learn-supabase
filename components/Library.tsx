"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

export default function Library() {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      authModal.onOpen();
    }

    // TODO: Check for subscription

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="items-cen inline-flex gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-medium text-md text-neutral-400">Your library</p>
        </div>
        <AiOutlinePlus
          size={20}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onClick}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">List of songs</div>
    </div>
  );
}
