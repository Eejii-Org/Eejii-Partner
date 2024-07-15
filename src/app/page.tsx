"use client";
import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, userLoading } = useAuth();
  const router = useRouter();
  if (userLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    router.push("/auth");
    return <div></div>;
  }
  return <div>Home Page</div>;
}
