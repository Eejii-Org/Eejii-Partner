import { SignInComp } from "@/components/pages/sign-in";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <SignInComp />
    </Suspense>
  );
}
