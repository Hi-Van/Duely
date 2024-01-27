"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/lib/state";
import { useGetHealthQuery } from "@/hooks/auth.hook";

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

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const setAppUser = useAppState((state) => state.setUser);
  const getHealthQuery = useGetHealthQuery();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    void getHealthQuery();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Tabs
          defaultValue="email"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="w-full max-w-md">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="account@duely.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    For Recovery and Account Management
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="credentials" className="w-full max-w-md">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-4 ">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Van S." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4 mb-6">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <div className="w-full min-h-screen h-fit">
<div className="flex items-center w-full h-full grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold text-center mb-12">
              Welcome to Duely.
            </h1>
            <p className="text-xl text-center mb-12">
              Duely is a platform for creating and managing your own online
              business.
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold mb-8">
              Welcome to Duely.
            </h1>
            <p className="text-xl text-center mb-16 text-slate-400">
              Daily things, weekly things, monthly things, yearly things, <br/> and more. All done right.
            </p>
            <ProfileForm />
          </div>
        </div>
      </div>
    </main>
  );
}
