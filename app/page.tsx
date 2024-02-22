import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import { BsBookmarks } from "react-icons/bs";
import unsplash from "@/assets/takashi-miyazaki-64ajtpEzlYc-unsplash.jpg";
import Image from "next/image";
import { DarkModeToggle } from "@/components/ui/darkmode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-full min-h-screen flex flex-row">
        <div className="w-1/5 border">
          <div className="border-b">accounts and settings area</div>
        </div>
        <div className="w-3/5">
          <div className="sticky top-0 left-0 z-10 flex w-full h-11 px-4 items-center justify-between bg-background/40 backdrop-blur-sm drop-shadow-sm">
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-semibold">Workspace name</h2>
              <BsBookmarks className="w-4 h-4" />
            </div>
            <div className="flex gap-2">
              <Button size={"sm"}>
                <IoPerson className="h-3 w-3 mr-1.5" /> Invite
              </Button>
              <Button size={"sm"}>Share</Button>
              <DarkModeToggle />
            </div>
          </div>

          <div className="relative -mt-11">
            <Image
              alt="unsplash image"
              src={unsplash}
              className="aspect-[3/1] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-background"></div>
          </div>
        </div>
        <div className="w-1/5 border">
          <div className="border-b">calendar area</div>
        </div>
      </div>
    </main>
  );
}
