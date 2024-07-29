"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ProjectInputs } from "@/schemas/projectSchema";
import {
  useAddProjectImage,
  useEditProject,
  useFetchProject,
} from "@/lib/projects";
import { showToast } from "@/utils/show-toast";
import { ProjectType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { MainLayout } from "../main-layout";
import { IconButton } from "../icon-button";
import { ArrowLeft } from "../icons/arrow-left";
import { ToolTip } from "../tool-tip";
import { FundraisingForm } from "../fundraising-form";
import { GrantFundraisingForm } from "../grant-fundraising-form";

export const EditProjectComp = ({ slug }: { slug: string }) => {
  const { data: project, isLoading } = useFetchProject(slug);
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [cover, setCover] = useState<File | undefined>();

  const { mutate, isPending: isProjectLoading } = useEditProject();
  const { mutate: addImage, isPending: isImageLoading } = useAddProjectImage();

  const queryClient = useQueryClient();
  function handleSubmit(type: string, data: ProjectInputs) {
    mutate(
      {
        slug: slug,
        formData: data,
      },
      {
        onSuccess: async (data: ProjectType) => {
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
          showToast("success", "Successfully updated Fundraising");
          await queryClient.invalidateQueries({
            queryKey: ["project", slug],
          });
          router.push(`/projects/${slug}`);
        },
        onError: (err) => {
          showToast("error", err.message);
        },
      },
    );
  }

  return (
    <MainLayout>
      {isLoading ? (
        "...loading"
      ) : (
        <div className="space-y-5">
          {/* HEADER */}
          <div className="bg-white border-2 rounded-2xl p-5 flex items-center gap-5">
            <IconButton
              component="link"
              icon={<ArrowLeft color="#3c888d" />}
              variant="outline"
              href={`/projects/${project?.slug}`}
            />
            <p className="font-semibold text-lg">
              {type === "fundraising"
                ? `Хандив олох төсөл: ${project?.title}`
                : `Хандив өгөх төсөл: ${project?.title}`}
            </p>
            <ToolTip text="Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:, Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:" />
          </div>
          {/* GRANT FORM */}
          {type === "fundraising" ? (
            <FundraisingForm
              fundraising={project ?? null}
              handleFormSubmit={handleSubmit}
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
              setCover={setCover}
              cover={cover}
            />
          ) : (
            <GrantFundraisingForm
              grantFundraising={project ?? null}
              handleFormSubmit={handleSubmit}
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
              setCover={setCover}
              cover={cover}
            />
          )}
        </div>
      )}
    </MainLayout>
  );
};
