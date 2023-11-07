import prismaDB from "@/app/_db/connection";
import { NextResponse } from "next/server";

export async function name(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const userId = await params.id;
    const user = await prismaDB.user.findFirst({
      where: { id: userId },
      include: { Product: { select: { id: true } } },
    });

    if (user) {
      return NextResponse.json({ message: "an error occured", success: false });
    }

    return NextResponse.json({ user });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
