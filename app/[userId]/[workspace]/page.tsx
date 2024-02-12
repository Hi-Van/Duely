"use client";

import Editor from "@/components/ui/editor/editor";
import NavigationBar from "@/components/ui/navigation-bar";
import RouteProtector from "@/lib/route-protector.lib";

export default function Page({
  params,
}: {
  params: { userId: string; workspace: string };
}) {
  return (
    <div>
      <Editor />
    </div>
  );
}
