"use client";

import { ProfileForm } from "@/components/ui/profile-form";
import * as z from "zod";

export default function Page() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Email must be valid.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
  });

  return (
    <div className="flex items-center w-full min-h-screen">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold mb-4 gradient-text">Welcome to Duely.</h1>
        <p className="text-lg text-center mb-24 text-slate-400">
          Get the things that matter, done right.
        </p>
        <ProfileForm login={false} formSchema={formSchema} />
      </div>
    </div>
  );
}
