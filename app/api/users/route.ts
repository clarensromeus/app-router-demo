import { NextResponse } from "next/server";
import prismaDB from "../../_db/connection";

export async function GET(request: Request) {
  try {
    const users = await prismaDB.user.findMany({
      include: { Product: { select: { id: true } } },
    });
    return NextResponse.json({ users });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
