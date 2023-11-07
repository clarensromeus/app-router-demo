"use server";

export async function AllProducts() {
  const res = await fetch("http://localhost:3000/api/product", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("failed");
  }

  const data = await res.json();

  return data;
}
