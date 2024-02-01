import dynamic from "next/dynamic";
import Editor from "@/components/ui/editor";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Editor />
    </div>
  );
}
