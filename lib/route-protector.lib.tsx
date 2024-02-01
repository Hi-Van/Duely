import { useAppState } from "./state.lib";
import { permanentRedirect } from "next/navigation";
import { useGetValidationQuery } from "@/hooks/auth.hook";
import { useEffect, Suspense } from "react";

export default function RouteProtector({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppState((state) => state.user);
  const [validationQuery, getValidationQuery] = useGetValidationQuery();

  void validationQuery(null, {
    authorization: `Bearer=${"test" || user?.token}`,
    "user-id": "test" || user?.userId,
  });
  useEffect(() => {
    if (
      (getValidationQuery.data && !getValidationQuery.data.isAuthorized) ||
      getValidationQuery.error
    ) {
      permanentRedirect("/");
    }
  }, [getValidationQuery.data, getValidationQuery.error]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {getValidationQuery.isLoading || !getValidationQuery.data
        ? null
        : children}
    </Suspense>
  );
}
