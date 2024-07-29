"use client";
import {
  ArrowLeft,
  IconButton,
  MainLayout,
  ToolTip,
  EventForm,
  VolunteeringEventForm,
} from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { EventInputs } from "@/schemas/eventSchema";
import { useAddEventImage, useEditEvent, useFetchEvent } from "@/lib";
import { showToast } from "@/utils/show-toast";
import { EventType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export const EditEventComp = ({ slug }: { slug: string }) => {
  const { data: event, isLoading } = useFetchEvent(slug);
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [cover, setCover] = useState<File | undefined>();

  const { mutate, isPending: isEventLoading } = useEditEvent();
  const { mutate: addImage, isPending: isImageLoading } = useAddEventImage();

  const queryClient = useQueryClient();
  function handleSubmit(type: string, data: EventInputs) {
    mutate(
      {
        slug: slug,
        formData: data,
      },
      {
        onSuccess: async (data: EventType) => {
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
          showToast("success", "Successfully updated event");
          await queryClient.invalidateQueries({
            queryKey: ["event", slug],
          });
          router.push(`/events/${slug}`);
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
              href={`/events/${event?.slug}`}
            />
            <p className="font-semibold text-lg">
              {type === "event"
                ? `Арга хэмжээ: ${event?.title}`
                : `Сайн дурын арга хэмжээ: ${event?.title}`}
            </p>
            <ToolTip text="Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:, Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:" />
          </div>
          {type === "event" ? (
            <EventForm
              event={event ?? null}
              handleFormSubmit={handleSubmit}
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
              setCover={setCover}
              cover={cover}
            />
          ) : (
            <VolunteeringEventForm
              event={event ?? null}
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
