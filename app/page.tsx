import React from "react";
import SignIn from "./_component/Signin";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}
