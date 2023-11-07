import React from "react";
import SignUp from "@/app/_component/SignUp";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session: Session | null = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignUp />
    </div>
  );
}
