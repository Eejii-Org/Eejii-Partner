"use client";

import { UserType } from "@/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { UserTypeSelect } from "../auth/sign-up/user-select";
import { SupporterStep1 } from "../auth/sign-up/supporter/Step1";
import { SupporterStep2 } from "../auth/sign-up/supporter/Step2";
import { Step3 } from "../auth/sign-up/supporter/Step3";
import { Step4 } from "../auth/sign-up/supporter/Step4";
import { Button } from "../button";

type UserTypes = "supporter" | "partner";

const inputs = {
  volunteer: [
    {
      label: "Холбоо барих",
    },
    {
      label: "Хувийн мэдээлэл",
    },
    {
      label: "Гэрийн хаяг",
    },
    {
      label: "Танилцуулга",
    },
  ],
  supporter: [
    {
      label: "Нөхцөл",
    },
    {
      label: "Хувийн мэдээлэл",
    },
    {
      label: "Хаяг",
    },
    {
      label: "Танилцуулга",
    },
  ],
  partner: [
    {
      label: "Холбоо барих",
    },
    {
      label: "Хувийн мэдээлэл",
    },
    {
      label: "Гэрийн хаяг",
    },
    {
      label: "Танилцуулга",
    },
  ],
};

export const SignUpComp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<UserType>({
    email: "",
    plainPassword: "",
    phoneNumber: "",
    username: "",
    bio: "",
    organizationType: "",
    address: {
      country: "Mongolia",
      countryCode: "MN",
      region: "УБ — Баянзүрх",
      regionCode: "UB-BZD",
      address: "",
    },
  });
  const [userType, setUserType] = useState<"supporter" | "partner" | null>(
    null,
  );
  const [step, setStep] = useState<number>(-1);
  const steps = useMemo(() => {
    if (!userType) return 3;
    return inputs[userType].length;
  }, [userType]);
  useEffect(() => {
    if (userType) return;
    const uType = searchParams.get("user");
    if (uType) {
      setUserType(uType as UserTypes);
      setStep(1);
    } else {
      setStep(0);
    }
  }, [searchParams, userType]);
  return (
    <section className="container flex flex-col flex-1 h-full pb-16">
      <div className="flex items-center justify-center">
        {step == 0 ? (
          <UserTypeSelect
            onSelect={(type) => {
              setUserType(type as UserTypes);
              setStep(1);
            }}
          />
        ) : (
          <form
            className="w-full md:min-w-[800px] flex flex-col gap-12 items-center"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.target as HTMLFormElement);
              setErrorMessage("");
              if (step == 1) {
                const organizationType = formData.get(
                  "organizationType",
                ) as string;
                setUserDetail({
                  ...userDetail,
                  organizationType,
                });
                setStep(step + 1);
              } else if (step == 2) {
                const email = formData.get("email") as string;
                const plainPassword = formData.get("plainPassword") as string;
                const phoneNumber = formData.get("phoneNumber") as string;
                const username = formData.get("username") as string;
                setUserDetail({
                  ...userDetail,
                  email,
                  plainPassword,
                  phoneNumber,
                  username,
                });
                setStep(step + 1);
              } else if (step == 3) {
                const region = formData.get("region") as string;
                const address = formData.get("address") as string;
                setUserDetail({
                  ...userDetail,
                  address: {
                    ...userDetail.address,
                    region,
                    address,
                  },
                });
                setStep(step + 1);
              } else {
                setSignUpLoading(true);
                const bio = formData.get("bio") as string;
                const newUser = {
                  email: userDetail.email,
                  plainPassword: userDetail.plainPassword,
                  phoneNumber: userDetail.phoneNumber,
                  username: userDetail.username,
                  bio: bio,
                  address: userDetail.address,
                  organizationType: userDetail.organizationType,
                };
                setUserDetail(newUser);
                try {
                  try {
                    let res = null;
                    if (userType == "partner") {
                      res = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/partner`,
                        {
                          ...newUser,
                        },
                      );
                    } else {
                      res = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/supporter`,
                        {
                          ...newUser,
                        },
                      );
                    }
                    console.log(res);
                  } catch (error: any) {
                    throw error?.response?.data;
                  }
                  setSignUpLoading(false);
                  router.push("/auth/sign-up/success");
                } catch (e) {
                  console.log(e);
                  setSignUpLoading(false);
                  setErrorMessage(
                    "Имэйл бүртгэлтэй байна. Та дараа дахин оролдоно уу.",
                  );
                }
              }
            }}
          >
            <div className="flex flex-col relative w-full">
              <div className="flex items-center justify-between">
                {userType &&
                  inputs?.[userType].map(({ label }, index: number) => (
                    <div
                      className={`flex-1 flex flex-col gap-2 items-center ${
                        index + 1 == step ? "flex" : "hidden md:flex"
                      }`}
                      key={index}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative z-10 ${
                          index + 1 <= step
                            ? "bg-primary text-white"
                            : "bg-backgroundSecondary "
                        }`}
                        key={index}
                      >
                        {index + 1}
                      </div>
                      <label className="text-center">{label}</label>
                    </div>
                  ))}
              </div>
              <div
                className="absolute w-full top-[26px] h-1"
                style={{
                  padding: `0px ${100 / (2 * steps)}%`,
                }}
              >
                <div className={`bg-backgroundSecondary w-[calc(100%)] h-1`} />
                <div
                  className={`bg-primary h-1 transition-all -mt-1`}
                  style={{
                    width: Math.floor((100 / (steps - 1)) * (step - 1)) + "%",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:max-w-[600px] w-full">
              <>
                {step == 1 ? (
                  <SupporterStep1 userDetail={userDetail} />
                ) : step == 2 ? (
                  <SupporterStep2 userDetail={userDetail} />
                ) : step == 3 ? (
                  <Step3 userDetail={userDetail} />
                ) : (
                  <Step4 userDetail={userDetail} />
                )}
              </>
            </div>
            <div className="flex flex-col gap-2">
              {errorMessage && (
                <p className="text-red-600 text-md">{errorMessage}</p>
              )}
              <div className="flex flex-row gap-4 w-full md:w-fit">
                <Button
                  component="button"
                  className="border border-primary bg-transparent !text-primary hover:bg-gray-200 flex-1 md:flex-auto md:min-w-64"
                  type="button"
                  onClick={() =>
                    setStep(step == null ? 0 : step == 0 ? step : step - 1)
                  }
                >
                  Буцах
                </Button>
                <Button
                  component="button"
                  type="submit"
                  className="flex-1 md:flex-auto md:min-w-64"
                >
                  {step == steps ? "Бүртгүүлэх" : "Үргэлжлүүлэх"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div
        className={`z-50 w-screen h-screen left-0 top-0 absolute bg-black/50 items-center justify-center ${
          signUpLoading ? "flex" : "hidden"
        }`}
      >
        <p className="text-white font-medium text-lg">Loading...</p>
      </div>
    </section>
  );
};
