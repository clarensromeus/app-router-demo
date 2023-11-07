import prismaDB from "@/app/_db/connection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const products = await prismaDB.product.findMany();
    return NextResponse.json({ products });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
