"use client";
import { Loader } from "@/components/loader";
import { MainLayout } from "@/components/main-layout";
import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";

export default function ProjectDetail() {
  const { user, userLoading } = useAuth();
  const router = useRouter();
  if (userLoading) {
    return <Loader />;
  }
  if (!user) {
    router.push("/auth");
    return <div></div>;
  }
  return (
    <MainLayout>
      <div>hii</div>
    </MainLayout>
  );
}
