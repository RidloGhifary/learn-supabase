"use client";

import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from "react";

export default function ModalProvider(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <AuthModal />;
}
