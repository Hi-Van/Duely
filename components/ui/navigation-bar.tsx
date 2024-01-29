"use client";

import { Button } from "./button";
import { Separator } from "./separator";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { BiSolidParty } from "react-icons/bi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useAppState } from "@/lib/state.lib";

export default function NavigationBar() {
  const { setTheme, theme, systemTheme } = useTheme();
  const setAppUser = useAppState((state) => state.setUser);

  const themeIcon = () => {
    if (!theme|| systemTheme === "dark" || theme === "dark") {
      return <MoonIcon className="h-4 w-4" />;
    }

    return <SunIcon className="h-4 w-4" />;
  };
  return (
    <div className="w-full z-1 fixed px-4 py-2 ">
      <div className="w-full flex justify-between items-center px-4">
        <Link href="/" className="font-extrabold text-xl">
          Duely
        </Link>
        <div className="flex space-x-2 items-center">
          <Button variant={!theme || theme === "dark" ? "outline" : "default"} asChild>
            <Link href="/signup">
              Join The Party <BiSolidParty className="ml-1" />
            </Link>
          </Button>
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
      <Separator className="my-2" />
    </div>
  );
}
