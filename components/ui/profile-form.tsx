"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useGetRegisterMutation, useGetLoginMutation } from "@/hooks/auth.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useAppState } from "@/lib/state.lib";

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

export function ProfileForm({login = false}: {login?: boolean}) {
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
  const [registerQuery, getRegisterQuery] = useGetRegisterMutation();
  const [loginQuery, getLoginQuery] = useGetLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (getRegisterQuery.data) {
      setAppUser(getRegisterQuery.data);
      router.push("/");
    }

    if (getLoginQuery.data) {
      setAppUser(getLoginQuery.data);
      router.push("/");
    }
  }, [getRegisterQuery.data, getLoginQuery.data, router, setAppUser]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (login) {
      void loginQuery(values);
    } else {
        void registerQuery(values);
    }
  }

  const signUpForm = (
    <Tabs defaultValue="email" className="w-full flex flex-col items-center">
      <TabsList className="grid w-full max-w-md mb-2 grid-cols-2">
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="credentials">Credentials</TabsTrigger>
      </TabsList>
      <TabsContent value="email" className="w-full min-h-72 max-w-md">
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
      <TabsContent value="credentials" className="w-full min-h-72 max-w-md">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Duelyname" {...field} />
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
            <FormItem className="my-8">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </TabsContent>
    </Tabs>
  );

  const loginForm = (
    <div className="w-full flex flex-col items-center">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="mt-4 w-full max-w-md">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Duelyname" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="mt-4 mb-8 w-full max-w-md">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter password..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full max-w-md">
        Login
      </Button>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {login ? loginForm : signUpForm}
      </form>
      <Separator className="my-4 max-w-md" />
      <p className="text-sm text-slate-500">
        Already have an account?{" "}
        <Button
          variant="link"
          className="m-0 p-0 text-inherit font-normal"
          onClick={() => {
            router.push(login ? "/signup" : "/login");
          }}
        >
          Go to {login ? "sign up" : "login"}.
        </Button>
      </p>
    </Form>
  );
}