import prismaDB from "@/app/_db/connection";
import bcryptjs from "bcryptjs";
import { isError } from "lodash";
import SignUpValidation from "@/app/_lib/signup";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { Firstname, Lastname, Email, Password } = await request.json();

    const isValidate = SignUpValidation.parse({
      Firstname,
      Lastname,
      Email,
      Password,
    });

    if (isError(isValidate)) {
      return NextResponse.json({
        message: "Bad credentials",
        success: false,
      });
    }

    const isuserExist = await prismaDB.user.findFirst({
      where: { Email: `${Email}` },
    });

    if (isuserExist) {
      return NextResponse.json({
        message: "sorry user already exists",
        success: false,
      });
    }

    const salt: string = await bcryptjs.genSalt(10);

    const hashPassword: string = await bcryptjs.hash(`${Password}`, salt);

    const recordUser = await prismaDB.user.create({
      data: {
        Firstname: `${Firstname}`,
        Lastname: `${Lastname}`,
        Email: `${Email}`,
        Password: `${hashPassword}`,
      },
    });

    if (!recordUser) {
      return NextResponse.json({ message: "Bad credential", success: false });
    }

    return NextResponse.json({
      message: "user successfully registered",
      success: true,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
