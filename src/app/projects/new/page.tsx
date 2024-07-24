"use client";

import {
  ArrowLeft,
  IconButton,
  MainLayout,
  ToolTip,
  FundraisingForm,
  GrantFundraisingForm,
} from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ProjectInputs } from "@/schemas/projectSchema";
import { useAddProjectImage, useCreateProject } from "@/lib";
import { showToast } from "@/utils/show-toast";
import { ProjectType } from "@/types";

const NewProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [cover, setCover] = useState<File | undefined>();

  const { mutate, isPending: isProjectLoading } = useCreateProject();
  const { mutate: addImage, isPending: isImageLoading } = useAddProjectImage();

  function handleSubmit(type: string, data: ProjectInputs) {
    mutate(
      {
        type: type === "fundraising" ? "fundraising" : "grant_fundraising",
        formData: data,
      },
      {
        onSuccess: (data: ProjectType) => {
          thumbnail &&
            addImage(
              { type: "thumbnail", file: thumbnail, slug: data.slug },
              {
                onError: (err) => {
                  showToast("error", err.message);
                },
              },
            );
          cover && addImage({ type: "cover", file: cover, slug: data.slug });
          showToast("success", "Successfully created Fundraising");
          router.push(`/projects?type=fundraising`);
        },
        onError: (err) => {
          showToast("error", err.message);
        },
      },
    );
  }

  return (
    <MainLayout>
      <div className="space-y-5">
        {/* TAB */}
        <div>
          <div className="flex gap-3">
            <button
              className={`border rounded-full px-2 py-1 transition-all ease-in duration-150
            ${type === "fundraising" ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              type="button"
              onClick={() => router.push(`/projects/new?type=fundraising`)}
            >
              <span>Хандив олох төсөл</span>
            </button>
            <button
              className={`border rounded-full px-2 py-1 transition-all ease-in duration-150
            ${type === "grant_fundraising" ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              type="button"
              onClick={() =>
                router.push(`/projects/new?type=grant_fundraising`)
              }
            >
              <span>Хандив өгөх төсөл</span>
            </button>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Use flex-auto to allow a flex item to grow and shrink, taking into
            account its initial size:
          </p>
        </div>
        {/* HEADER */}
        <div className="bg-white border-2 rounded-2xl p-5 flex items-center gap-5">
          <IconButton
            component="link"
            icon={<ArrowLeft />}
            variant="outline-gray"
            href={`/projects`}
          />
          <p className="font-semibold text-lg">
            {type === "fundraising"
              ? "Хандив олох төсөл нэмэх"
              : "Хандив өгөх төсөл нэмэх "}
          </p>
          <ToolTip text="Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:, Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:" />
        </div>
        {/* GRANT FORM */}
        {type === "fundraising" ? (
          <FundraisingForm
            fundraising={null}
            handleFormSubmit={handleSubmit}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            setCover={setCover}
            cover={cover}
          />
        ) : (
          <GrantFundraisingForm
            grantFundraising={null}
            handleFormSubmit={handleSubmit}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            setCover={setCover}
            cover={cover}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default NewProject;
