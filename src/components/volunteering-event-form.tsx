"use client";

import { volunteeringEventSchema, EventInputs } from "@/schemas/eventSchema";
import { Button } from "./button";
import Image from "next/image";
import { DragAndDropFileUpload } from "./drag-and-drop";
import Editor from "./editor";
import { FormInput, NumberedInputWrapper } from "./form-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, EventType } from "@/types";
import { getCategories } from "@/actions/actions";
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { formatDateTimeLocal } from "@/utils/to-date-string";
import { IconButton } from "./icon-button";
import { useDeleteEventImage } from "@/lib/events";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "./icons/arrow-right";
import { Close } from "./icons/close";

export const VolunteeringEventForm = ({
  event,
  handleFormSubmit,
  thumbnail,
  setThumbnail,
  cover,
  setCover,
}: {
  event?: EventType | null;
  handleFormSubmit: (type: string, data: EventInputs) => void;
  thumbnail: File | undefined;
  setThumbnail: (file: File | undefined) => void;
  cover: File | undefined;
  setCover: (file: File | undefined) => void;
}) => {
  const { mutate: deleteImage, isPending: isDeleteImagePending } =
    useDeleteEventImage();

  const [startTime, setStartTime] = useState<Date>(
    new Date(event?.startTime ?? "now"),
  );
  const [endTime, setEndTime] = useState<Date>(
    new Date(event?.endTime ?? "now"),
  );

  const thumbnailImage =
    event?.images?.find((img: any) => img.type == "thumbnail")?.path || null;
  const coverImage =
    event?.images?.find((img: any) => img.type == "cover")?.path || null;

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const eventCategories = event?.categories.map((c) => c?.["@id"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    eventCategories ?? [],
  );
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<EventInputs>({
    defaultValues: {
      title: event?.title ?? "",
      description: event?.description ?? "",
      shortDescription: event?.shortDescription ?? "",
      categories: [],
      volunteeringHours: event?.volunteeringHours ?? 0,
      startTime: event?.startTime ?? "",
      endTime: event?.endTime ?? "",
      contact: {
        email: event?.contact?.email,
        phoneNumber: event?.contact.phoneNumber ?? "",
      },
    },
    mode: "onChange",
    resolver: zodResolver(volunteeringEventSchema),
    // reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<EventInputs> = (data) => {
    handleFormSubmit("volunteering_event", {
      ...data,
      categories: selectedCategories,
      volunteeringHours: data?.volunteeringHours ? +data?.volunteeringHours : 0,
    });
  };

  const queryClient = useQueryClient();
  function handleDeleteImage(type: string) {
    const image = event?.images.find((image) => image.type === type);
    if (image) {
      deleteImage(
        { slug: event?.slug as string, id: image.id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["event", event?.slug],
            });
          },
        },
      );
    }
  }

  useEffect(() => {
    const fetchCategories = () => {
      getCategories().then((res) => {
        setCategories(res);
      });
    };
    fetchCategories();
  }, []);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* INPUT */}
      <NumberedInputWrapper number={1} label="Төслийн нэр">
        <FormInput placeholder="Төслийн нэр" {...register("title")} />
        {errors?.title && (
          <p className="text-sm text-red-500">{errors?.title.message}</p>
        )}
      </NumberedInputWrapper>
      <NumberedInputWrapper number={2} label="Сайн дурын ажилын цаг">
        <FormInput
          type={"number"}
          {...register("volunteeringHours")}
          placeholder="Сайн дурын ажилтны ажиллах дундаж цагыг оруулна уу"
        />
      </NumberedInputWrapper>
      {/* DRAG AND DROP */}
      <NumberedInputWrapper number={3} label="Зураг">
        <div className="flex gap-5">
          <div className="flex-auto flex flex-col text-center justify-center">
            <span className="text-gray-600 mb-2">Thumbnail харагдах зураг</span>
            {thumbnailImage ? (
              <div className="relative w-full min-h-[300px] rounded-xl overflow-hidden">
                <Image
                  src={thumbnailImage}
                  alt="images"
                  fill
                  className="object-cover"
                />
                <IconButton
                  className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-400"
                  component="button"
                  icon={<Close />}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage("thumbnail");
                  }}
                />
              </div>
            ) : (
              <DragAndDropFileUpload setFile={setThumbnail} file={thumbnail} />
            )}
          </div>
          <div className="flex-auto flex flex-col text-center justify-center">
            <span className="text-gray-600 mb-2">Cover | Дэлгэрнгүй зураг</span>
            {coverImage ? (
              <div className="relative w-full min-h-[300px] rounded-xl overflow-hidden">
                <Image
                  src={coverImage}
                  alt="images"
                  fill
                  className="object-cover"
                />
                <IconButton
                  className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-400"
                  component="button"
                  icon={<Close />}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage("cover");
                  }}
                />
              </div>
            ) : (
              <DragAndDropFileUpload setFile={setCover} file={cover} />
            )}
          </div>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={4} label="Эхлэх болон дуусах хугацаа">
        <div className="flex">
          <div className="flex items-center px-2 py-1 gap-2 border">
            <DateTimePicker
              className={"border-none"}
              value={startTime}
              locale="mn-MN"
              onChange={(value) => {
                setStartTime(value as Date);
                setValue("startTime", formatDateTimeLocal(value as Date));
              }}
            />
            <ArrowRight color="#6b7280" />
            <DateTimePicker
              value={endTime}
              locale="mn-MN"
              onChange={(value) => {
                setEndTime(value as Date);
                setValue("endTime", formatDateTimeLocal(value as Date));
              }}
            />
          </div>
        </div>
        {errors?.startTime && (
          <p className="text-sm text-red-500">{errors?.startTime.message}</p>
        )}
        {errors?.endTime && (
          <p className="text-sm text-red-500">{errors?.endTime.message}</p>
        )}
      </NumberedInputWrapper>
      <NumberedInputWrapper number={5} label="Төслийн дэлгэрэнүй">
        <Editor
          setData={(description) => setValue("description", description)}
          data={getValues("description")}
        />
        {errors?.description && (
          <p className="text-sm text-red-500">{errors?.description.message}</p>
        )}
      </NumberedInputWrapper>
      <NumberedInputWrapper number={6} label="Төслийн богино тайлбар">
        <textarea
          className="w-full border rounded-lg"
          {...register("shortDescription")}
        />
        {errors?.shortDescription && (
          <p className="text-sm text-red-500">
            {errors?.shortDescription.message}
          </p>
        )}
      </NumberedInputWrapper>
      <NumberedInputWrapper number={7} label="Холбоо барих">
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <FormInput
              {...register("contact.phoneNumber")}
              placeholder="Утас"
            />
            {errors?.contact?.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors?.contact.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <FormInput {...register("contact.email")} placeholder="Имэйл" />
            {errors?.contact?.email && (
              <p className="text-sm text-red-500">
                {errors?.contact.email.message}
              </p>
            )}
          </div>
        </div>
      </NumberedInputWrapper>
      <NumberedInputWrapper number={8} label="Ангилал">
        <div className="flex flex-wrap gap-3">
          {categories?.map((category, i) => {
            return (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const exists = selectedCategories.find(
                    (p) => p === category["@id"],
                  );
                  if (exists) {
                    const newArr = selectedCategories.filter(
                      (item) => item !== category["@id"],
                    );
                    setSelectedCategories(newArr);
                  } else {
                    setSelectedCategories((prev) => [...prev, category["@id"]]);
                  }
                }}
                className={`flex items-center text-sm border rounded-full px-2 py-1 transition-all ease-in duration-150
                  ${selectedCategories.find((p) => p === category["@id"]) ? "border-none bg-primary-800 tracking-widest text-white font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        {errors?.categories && (
          <p className="text-sm text-red-500">{errors?.categories.message}</p>
        )}
      </NumberedInputWrapper>
      <NumberedInputWrapper number={9} label="Хянаж үзэх" isLast>
        <p className="text-md text-gray-600 mb-5">
          ОРУУЛСАН МЭДЭЭЛЛҮҮДЭЭ ШАЛГААРАЙ. БҮХ ХЭСГИЙГ ЗӨВ БӨГЛӨСӨН ТОХИОЛДОЛД
          ХҮЛЭЭЛГИЙН ГОРИМД ОРЖ НИЙТЛЭГДЭНЭ.
        </p>
        <div className="flex justify-end gap-3">
          <Button component="button" type="submit" disabled={!isValid}>
            Хүсэлт илгээх
          </Button>
          <Button component="button" variant="outline">
            Устгах
          </Button>
        </div>
      </NumberedInputWrapper>
    </form>
  );
};
