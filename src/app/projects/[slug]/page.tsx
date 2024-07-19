"use client";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { MainLayout } from "@/components/main-layout";
import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";
import { Button, PencilSimpleIcon } from "@/components";

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
  const state = "new";
  return (
    <MainLayout>
      <div className="w-full border-l-4 border-yellow-400 flex justify-between items-center mb-5">
        <h1 className="font-semibold pl-3">Хандив өгөх төсөл</h1>
        <Button icon={<PencilSimpleIcon />}>Янзлах</Button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          className={`bg-white border rounded-2xl p-5 space-y-2 border-t-[16px]
            ${state === "new" ? "border-t-primary-700" : state === "done" ? "border-t-gray-700" : state === "pending" ? "border-t-amber-500" : state === "denied" ? "border-t-red-500" : ""}`}
        >
          <div className="w-full min-h-[300px] rounded-xl overflow-hidden relative group">
            <Image
              src="/assets/partner/partner-hero.webp"
              alt="images"
              fill
              className="object-cover"
            />
            <div className="absolute top-5 left-0 w-full transition-all ease-in duration-200 group-hover:opacity-0">
              <div className="flex justify-center">
                <p className="text-md font-semibold uppercase text-amber-500 bg-white rounded-xl p-3 bg-opacity-80">
                  pending
                </p>
              </div>
            </div>
          </div>
          <table className="table w-full">
            <tr className="border-b h-10">
              <td className="font-medium ">Зохион байгуулагч</td>
              <td>Mother earth NGO</td>
            </tr>
            <tr className="border-b h-10">
              <td className="font-medium ">Зорилтод босгох дүн</td>
              <td>5</td>
            </tr>
            <tr className="border-b h-10">
              <td className="font-medium ">Босгосон дүн</td>
              <td>5</td>
            </tr>
            <tr className="border-b h-10">
              <td className="font-medium flex items-start h-full">
                Холбоо барих
              </td>
              <td>
                <p>tsolmmondark@gmail.com</p>
                <p>88548411</p>
              </td>
            </tr>
          </table>
        </div>
        <div className="space-y-5">
          <div className="bg-white border rounded-2xl p-5 space-y-2">
            <h3 className="border-b pb-2 font-semibold">Дэлгэрэнгүй тайлбар</h3>
            <p className="text-md">
              YOIS2022 тэтгэлгийн хамгийн том арга хэмжээнд манлайлагч 5 сайн
              дурын ажилчиддаа үнэгүй оролцох эрх бэлэглэх гэж байна. Тавигдах
              шаардлага маш энгийн тус сангаас зохион байгуулсан СДА-д 2-дээш
              сайн дурын ажил хийж байсан байхад л болно. Анхаарах зүйл :
              Бүртгэлээрээ хүсэлт өгсөн эхний 5 гишүүүн. Мөн тус арга хэмжээнд
              төсөл таницуулах ажилд 2-3 сайн дурын ажилтан хэрэгтэй байгаа шүү.
              :)
            </p>
          </div>
          <div className="bg-white border rounded-2xl p-5 space-y-2">
            <h3 className="border-b pb-2 font-semibold">
              Эхлэх болон дуусах хугацаа
            </h3>
            <p>
              Mon September 04, 2023 - Mon September 25, 2023 (UTC+08:00)
              Asia/Ulaanbaatar
            </p>
          </div>
          <div className="bg-white border rounded-2xl p-5 space-y-2">
            <h3 className="border-b pb-2 font-semibold">Ангилал</h3>
            <div className="flex flex-wrap gap-3">
              <button
                className={`flex items-center text-sm border rounded-full px-2 py-1 transition-all ease-in duration-150 border-none bg-primary-800 tracking-widest text-white font-semibold`}
              >
                Category 1
              </button>
              <button
                className={`flex items-center text-sm border rounded-full px-2 py-1 transition-all ease-in duration-150 border-none bg-primary-800 tracking-widest text-white font-semibold`}
              >
                Category 2
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
