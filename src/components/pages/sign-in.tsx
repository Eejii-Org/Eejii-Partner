"use client";

import { SignInButton, Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useAuth } from "@/providers/auth-provider";

export const SignInComp = () => {
  const { getUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  return (
    <section className="container flex flex-col flex-1 justify-center h-full pb-48">
      <div className="flex flex-col xs:items-center justify-center gap-4">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            try {
              setErrorMessage("");
              const email = formData.get("email");
              const password = formData.get("password");
              const res = await axios
                .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
                  email,
                  password,
                })
                .catch((e) => {
                  throw new Error(e?.response?.data?.message);
                });
              const data = res?.data;
              setCookie("token", data.token);
              getUser();
              router.push("/");
            } catch (e: any) {
              console.log(e);
              setErrorMessage(e?.message);
            }
          }}
          className="flex flex-col gap-3 xs:max-w-[364px] xs:w-[364px]"
        >
          <Input
            // label="Имэйл"
            name="email"
            placeholder="Имэйл"
            type="email"
            autoComplete="email"
            required
          />
          <Input
            // label="Нууц үг"
            name="password"
            placeholder="Нууц үг"
            type="password"
            autoComplete="current-password"
            required
          />
          <div className="flex flex-col gap-2 justify-center text-center">
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}
            <SignInButton />
          </div>
        </form>
        <div className="flex flex-col gap-3 xs:max-w-[364px] xs:w-[364px]">
          <Link
            href="/auth/forgot-password"
            className="text-md underline text-center text-primary"
          >
            Нууц Үг Мартсан?
          </Link>
          <hr color="red" className="w-full my-2" />
          <Button
            component="link"
            className="border border-primary bg-transparent !text-primary hover:bg-gray-200"
            href="/auth/sign-up"
          >
            Бүртгүүлэх
          </Button>
        </div>
      </div>
    </section>
  );
};
