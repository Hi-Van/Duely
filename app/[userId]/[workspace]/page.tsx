"use client";

import Editor from "@/components/ui/editor";
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
