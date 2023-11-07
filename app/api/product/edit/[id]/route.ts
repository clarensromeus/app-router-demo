import prismaDB from "@/app/_db/connection";
import { NextResponse } from "next/server";
import { editValidation } from "@/app/api/__utils__/validator/edit";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await params.id;

    const { Price } = await request.json();

    const isValid = editValidation.parse({ Price });

    if (!isValid) {
      return NextResponse.json({ message: "Bad credential", success: false });
    }

    const product = await prismaDB.product.update({
      where: { id: Number(userId) },
      data: { Price: Number(Price) },
    });

    if (!product) {
      return NextResponse.json({
        message: "sorry, product is not updated",
        success: false,
      });
    }

    return NextResponse.json({
      message: "product is updated with success",
      success: true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
