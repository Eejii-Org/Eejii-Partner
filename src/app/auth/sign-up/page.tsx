import { SignUpComp } from "@/components/pages/sign-up";
import { Suspense } from "react";

const SignUp = () => {
  return (
    <Suspense>
      <SignUpComp />
    </Suspense>
  );
};

export default SignUp;
