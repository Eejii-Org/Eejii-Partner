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
import { useAddEventImage, useCreateEvent } from "@/lib";
import { showToast } from "@/utils/show-toast";
import { EventType } from "@/types";

const NewEvent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [cover, setCover] = useState<File | undefined>();

  const { mutate, isPending: isEventLoading } = useCreateEvent();
  const { mutate: addImage, isPending: isImageLoading } = useAddEventImage();

  function handleSubmit(type: string, data: EventInputs) {
    mutate(
      {
        type: type === "event" ? "event" : "volunteering_event",
        formData: data,
      },
      {
        onSuccess: (data: EventType) => {
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
          showToast("success", "Successfully created event");
          router.push(`/events?type=event`);
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
            ${type === "event" ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              type="button"
              onClick={() => router.push(`/events/new?type=event`)}
            >
              <span>Арга хэмжээ</span>
            </button>
            <button
              className={`border rounded-full px-2 py-1 transition-all ease-in duration-150
            ${type === "volunteering_event" ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              type="button"
              onClick={() => router.push(`/events/new?type=volunteering_event`)}
            >
              <span>Сайн дурын арга хэмжээ</span>
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
            icon={<ArrowLeft color="#3c888d" />}
            variant="outline"
            href={`/events`}
          />
          <p className="font-semibold text-lg">
            {type === "event"
              ? "Арга хэмжээ нэмэх"
              : "Сайн дурын арга хэмжээ нэмэх "}
          </p>
          <ToolTip text="Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:, Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:" />
        </div>
        {/* GRANT FORM */}
        {type === "event" ? (
          <EventForm
            event={null}
            handleFormSubmit={handleSubmit}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            setCover={setCover}
            cover={cover}
          />
        ) : (
          <VolunteeringEventForm
            event={null}
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

export default NewEvent;
