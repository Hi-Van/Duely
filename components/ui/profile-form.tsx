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
import {
  useGetRegisterMutation,
  useGetLoginMutation,
  LoginBody,
} from "@/hooks/auth.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useAppState } from "@/lib/state.lib";

interface ProfileFormProps {
  login?: boolean;
  formSchema: z.ZodObject<any>;
}

export function ProfileForm({ login = false, formSchema }: ProfileFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: login
      ? { username: "", password: "" }
      : { email: "", username: "", password: "" },
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
      void loginQuery(values as LoginBody);
    } else {
      void registerQuery(values as LoginBody);
    }
  }

  const createFormField = (
    control: any,
    name: string,
    placeholder: string,
    label: string,
    description?: string
  ) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="my-4 w-full max-w-md">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const signUpForm = (
    <Tabs defaultValue="email" className="w-full flex flex-col items-center">
      <TabsList className="grid w-full max-w-md mb-2 grid-cols-2">
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="credentials">Credentials</TabsTrigger>
      </TabsList>
      <TabsContent value="email" className="w-full min-h-72 max-w-md">
        {createFormField(
          form.control,
          "email",
          "account@duely.com",
          "Email",
          "For Recovery and Account Management"
        )}
      </TabsContent>
      <TabsContent value="credentials" className="w-full min-h-72 max-w-md">
        {createFormField(
          form.control,
          "username",
          "Duelyname",
          "Username",
          "This is your public display name."
        )}
        {createFormField(
          form.control,
          "password",
          "Enter password...",
          "Password"
        )}

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </TabsContent>
    </Tabs>
  );

  const loginForm = (
    <div className="w-full flex flex-col items-center">
      {createFormField(form.control, "username", "Duelyname", "Username")}
      {createFormField(
        form.control,
        "password",
        "Enter password...",
        "Password"
      )}
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
