import prismaDB from "@/app/_db/connection";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = await params.id;

  try {
    const product = await prismaDB.product.delete({
      where: { id: Number(productId) },
    });

    if (!product) {
      return NextResponse.json({
        message: "sorry, product is not deleted",
        success: false,
      });
    }

    return NextResponse.json({
      message: "product is successfully deleted",
      success: true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
