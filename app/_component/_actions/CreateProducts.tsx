"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { upperFirst } from "lodash";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    const ProductName = await formData.get("ProductName");
    const Price = Math.floor(Math.random() * 2000) + 100;
    const Firstname = session?.user.name?.split("-")[0];
    const Lastname = session?.user.name?.split("-")[0];
    const Password = upperFirst(`${session?.user.name?.split("-")[0]}(+-1998)`);

    const res = await fetch("http://localhost:3000/api/product/create", {
      method: "POST",
      body: JSON.stringify({
        ProductName,
        Price,
        Firstname,
        Lastname,
        Password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("creation failed");
    }

    revalidatePath("/dashboard", "page");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
