import prismaDB from "@/app/_db/connection";
import { NextResponse } from "next/server";
import { isError } from "lodash";
import productValidation from "../../__utils__/validator/create";
import { IcreateProduct } from "@/app/_component/typing/UserandProduct";

export async function POST(request: Request) {
  try {
    const {
      ProductName,
      Price,
      Firstname,
      Lastname,
      Email,
      Password,
    }: Omit<IcreateProduct, "id"> = await request.json();

    const isValid = await productValidation.parse({
      ProductName,
      Price: Number(Price),
      Firstname,
      Lastname,
      Email,
      Password,
    });

    if (isError(isValid)) {
      return NextResponse.json({
        message: "something went wrong with your inputs",
        success: false,
      });
    }

    const product = await prismaDB.product.create({
      data: {
        ProductName: `${ProductName}`,
        Price: Number(Price),
        user: {
          create: {
            Firstname: `${Firstname}`,
            Lastname: `${Lastname}`,
            Password: `${Password}`,
            Email: `${Email}`,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({
        message: "something went wrong with your inputs",
        success: false,
      });
    }

    return NextResponse.json({
      message: "product is successfully added",
      success: true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
