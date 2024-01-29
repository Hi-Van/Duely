import { useAppState } from "./state.lib";
import { permanentRedirect } from "next/navigation";

export default function RouteProtector({ children }: { children: React.ReactNode}) {
  const user = useAppState((state) => state.user);

  if (!user) {
    permanentRedirect("/");
  }

  return <>{children}</>;
}
