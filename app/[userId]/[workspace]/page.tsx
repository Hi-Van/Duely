"use client";

import RouteProtector from "@/lib/route-protector.lib";

export default function Page({
  params,
}: {
  params: { userId: string; workspace: string };
}) {
  return (
    <RouteProtector>
      <div>
        <h1>Page</h1>
        <p>userId: {params.userId}</p>
        <p>workspace: {params.workspace}</p>
      </div>
    </RouteProtector>
  );
}
