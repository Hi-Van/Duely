"use client";

import { Button } from "./button";
import { Separator } from "./separator";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { BiSolidParty } from "react-icons/bi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useAppState } from "@/lib/state.lib";
import { LuBell } from "react-icons/lu";
import { Switch } from "./switch";
import { Label } from "./label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function NavigationBar() {
  const { setTheme, theme, systemTheme } = useTheme();
  const alerts = useAppState((state) => state.alerts);
  const setAlerts = useAppState((state) => state.setAlerts);
  const user = useAppState((state) => state.user);

  const glassEffect =
    "bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10";

  const themeIcon = () => {
    if (!theme || systemTheme === "dark" || theme === "dark") {
      return <MoonIcon className="h-4 w-4" />;
    }

    return <SunIcon className="h-4 w-4" />;
  };

  const SignUpButton = () => {
    return (
      <Button
        variant={!theme || theme === "dark" ? "outline" : "default"}
        asChild
      >
        <Link href="/signup">
          Join The Party <BiSolidParty className="ml-1" />
        </Link>
      </Button>
    );
  };

  const LoginButton = () => {
    return (
      <Button
        variant={!theme || theme === "dark" ? "outline" : "ghost"}
        asChild
      >
        <Link href="/login">Login</Link>
      </Button>
    );
  };

  const Notifications = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <LuBell className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="w-full h-fit m-2">here are some notifications</div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const Account = () => {
    return <Button>Account</Button>;
  };

  return (
    <div className={"w-full flex z-20 fixed top-4 justify-center items-center"}>
      <div className="w-[1000px] bg-background flex justify-between items-center p-2 border shadow-sm rounded-md">
        <Link href="/" className="font-extrabold text-xl">
          Duely
        </Link>
        <div className="flex space-x-2 items-center">
          {user ? (
            <>
              <Notifications />
              <Account />
            </>
          ) : (
            <>
              <LoginButton />
              <SignUpButton />
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                {themeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
