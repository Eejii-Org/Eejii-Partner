"use server";

import { UserType } from "@/types";
import axios from "axios";

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
      {
        email,
        password,
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUpSupporter = async (userData: UserType) => {
  "use server";
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/supporter`,
      {
        ...userData,
      },
    );
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const signUpPartner = async (userData: UserType) => {
  "use server";
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/partner`,
      {
        ...userData,
      },
    );
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const verifyEmail = async (email: string, token: string) => {
  "use server";
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verifyEmail`,
    {
      email,
      token,
    },
  );
};

export const getVerifyEmail = async (email: string) => {
  "use server";
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verificationToken`,
    {
      email,
    },
  );
};
