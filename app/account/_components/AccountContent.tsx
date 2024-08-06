"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AccountContent() {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomPortal = async () => {
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });

      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="space-y-4">
          <p>No active subscription plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="space-y-4">
          <p>
            You are currently on the{" "}
            <strong>{subscription?.prices?.products?.name}</strong> plan.
          </p>
          <Button
            onClick={redirectToCustomPortal}
            disabled={isLoading || loading}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
