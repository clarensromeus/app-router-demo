"use client";

import { IconButton } from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

type props = {
  productId: string;
};

export default function Delete({ productId }: props) {
  const router = useRouter();

  const deleteProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/product/delete/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error("failed");
    }

    router.refresh();
  };

  return (
    <IconButton
      size={"sm"}
      aria-label="delete"
      onClick={() => deleteProduct()}
      icon={<MdDelete size={21} color={"red"} />}
    />
  );
}
