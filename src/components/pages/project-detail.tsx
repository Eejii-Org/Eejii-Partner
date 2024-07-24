"use client";
import Image from "next/image";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, Button, IconButton, PencilSimpleIcon } from "@/components";
import { formatPrice } from "@/utils";
import { format } from "date-fns";
import { useFetchProject } from "@/lib";

export const ProjectDetailComp = ({ slug }: { slug: string }) => {
  const { data: project, isLoading } = useFetchProject(slug);
  const state = project?.state;
  console.log(project);

  const thumbnailImage =
    project?.images?.find((img: any) => img.type == "thumbnail")?.path ||
    "/assets/placeholder.svg";

  if (isLoading && !project) return "...loading";
  return (
    <MainLayout>
      <div className="w-full border-l-4 border-yellow-400 flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 ml-2">
          <IconButton
            component="link"
            className="p-[2px]"
            icon={<ArrowLeft width={20} height={20} color="#3c888d" />}
            href={`/projects?type=fundraising`}
            variant="outline"
          />
          <h1 className="font-semibold">
            {project?.type === "fundraising"
              ? "Хандив олох төсөл"
              : "Хандив өгөх төсөл"}
          </h1>
        </div>
        <Button
          component="link"
          icon={<PencilSimpleIcon color="white" />}
          href={`/projects/${slug}/edit?type=${project?.type}`}
        >
          Янзлах
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          className={`bg-white border rounded-2xl p-5 space-y-2 border-t-[16px]
            ${state === "new" ? "border-t-primary-700" : state === "done" ? "border-t-gray-700" : state === "pending" ? "border-t-amber-500" : state === "denied" ? "border-t-red-500" : ""}`}
        >
          <div className="w-full min-h-[300px] rounded-xl overflow-hidden relative group">
            <Image
              src={thumbnailImage}
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
            <tbody>
              <tr className="border-b h-10">
                <td className="font-medium ">Зохион байгуулагч</td>
                <td>{project?.owner.username}</td>
              </tr>
              {project?.type === "fundraising" && (
                <tr className="border-b h-10">
                  <td className="font-medium ">Зорилтод босгох дүн</td>
                  <td>{formatPrice(+project?.goalAmount, "MNT")}</td>
                </tr>
              )}
              {project?.type === "fundraising" && (
                <tr className="border-b h-10">
                  <td className="font-medium ">Босгосон дүн</td>
                  <td>{formatPrice(+project?.currentAmount, "MNT")}</td>
                </tr>
              )}
              <tr className="border-b h-10">
                <td className="font-medium flex items-start h-full">
                  Холбоо барих
                </td>
                <td>
                  <p>{project?.contact.email}</p>
                  <p>{project?.contact.phoneNumber}</p>
                </td>
              </tr>
              <tr className="border-b h-10">
                <td className="font-medium flex items-start h-full">
                  Богино тайлбар
                </td>
                <td>
                  <p>{project?.shortDescription}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="space-y-5">
          <div className="bg-white border rounded-2xl p-5 space-y-2">
            <h3 className="border-b pb-2 font-semibold">Дэлгэрэнгүй тайлбар</h3>
            <div
              className="html-content"
              dangerouslySetInnerHTML={{ __html: project?.description ?? "" }}
            />
          </div>
          <div className="bg-white border rounded-2xl p-5 space-y-2">
            <h3 className="border-b pb-2 font-semibold">
              Эхлэх болон дуусах хугацаа
            </h3>
            <p>
              {format(new Date(project?.startTime as string), "E LLLL dd, y")} -{" "}
              {format(new Date(project?.endTime as string), "E LLLL dd, y")}{" "}
              (UTC+08:00) Asia/Ulaanbaatar
            </p>
          </div>
          <div className="bg-white border rounded-2xl p-5 space-y-2">
            <h3 className="border-b pb-2 font-semibold">Ангилал</h3>
            <div className="flex flex-wrap gap-3">
              {project?.categories && project.categories.length > 0
                ? project?.categories.map((category, i) => (
                    <span
                      key={i}
                      className={`flex items-center text-sm border rounded-full px-2 py-1 transition-all ease-in duration-150 border-none bg-primary-800 tracking-widest text-white font-semibold`}
                    >
                      {category.name}
                    </span>
                  ))
                : "No category"}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};