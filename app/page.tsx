import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import { BsBookmarks } from "react-icons/bs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-full min-h-screen grid grid-rows-16 grid-cols-16">
        <div className="grid grid-rows-subgrid col-span-3 row-span-full bg-blue-500">
          <div className="row-span-3 bg-purple-500">
            accounts and settings area
          </div>
        </div>
        <div className="col-span-9 row-span-full bg-green-500">
          <div className="flex w-full h-10 items-center bg-red-500 px-2 justify-between">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-semibold">Workspace name</h2>
              <BsBookmarks className="w-4 h-4" />
            </div>
            <div className="flex gap-2">
              <Button size={"sm"}>
                <IoPerson className="h-3 w-3 mr-1.5" /> Invite
              </Button>
              <Button size={"sm"}>Share</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-subgrid col-span-4 row-span-full bg-blue-500">
          <div className="row-span-4 bg-purple-500">calendar area</div>
        </div>
      </div>
    </main>
  );
}
