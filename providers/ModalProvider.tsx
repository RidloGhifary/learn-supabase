"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

export default function ModalProvider(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Test modal"
        description="Test description"
        isOpen={true}
        onChange={() => {}}
      >
        Modal
      </Modal>
    </>
  );
}
