"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  }).format((price.unit_amount || 0) / 100);

  return priceString;
};

export default function SubscribeModal({ products }: SubscribeModalProps) {
  const subscribeModal = useSubscribeModal();
  const [priceIdLoading, setPriceIdLoading] = useState<string>("");
  const { user, isLoading, subscription } = useUser();

  const onChange = () => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading("");
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading("");
      return toast.error("Already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setPriceIdLoading("");
    }
  };

  let content = <div className="text-center">No Products Available.</div>;

  if (products.length) {
    content = (
      <div>
        {products?.map((product) => {
          if (!product?.prices?.length) {
            return <div key={product.id}>No Prices Available.</div>;
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
            >{`Subscribe for ${formatPrice(price)} a ${price.interval}`}</Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = (
      <div className="text-center">You are subscribed to the premium plan.</div>
    );
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}
