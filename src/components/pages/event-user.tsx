"use client";
import Image from "next/image";
import {
  useAcceptEventUser,
  useDenyEventUser,
  useFetchEventUsers,
} from "@/lib/events";
import { useSearchParams } from "next/navigation";
import { EventUserType } from "@/types";
import { format } from "date-fns";
import { showToast } from "@/utils/show-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Modal } from "../modal";
import { BookOpenIcon } from "../icons/book-open";
import { PhoneIcon } from "../icons/phone";
import { EnvelopeIcon } from "../icons/envelope";
import { MapPinIcon } from "../icons/map-pin";
import { SingleCheckIcon } from "../icons/single-check";
import { Button } from "../button";
import { Close } from "../icons/close";
import { MainLayout } from "../main-layout";
import { IconButton } from "../icon-button";
import { ArrowLeft } from "../icons/arrow-left";
import { StateTab } from "../tab";

const states = [
  {
    label: "Бүгд",
    value: null,
  },
  {
    label: "Хүлээгдэж буй",
    value: "pending",
  },
  {
    label: "Зөвшөөрсөн",
    value: "accepted",
  },
  {
    label: "Татгалзсан",
    value: "denied",
  },
];

const TableRow = ({
  slug,
  eventUser,
}: {
  slug: string;
  eventUser: EventUserType;
}) => {
  const queryClient = useQueryClient();
  const { mutate: acceptUser, isPending: isAcceptPending } =
    useAcceptEventUser();
  const { mutate: denyUser, isPending: isDenyPending } = useDenyEventUser();

  const deny = (userId: number) => {
    denyUser(
      { slug: slug, id: userId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["eventUsers", slug],
          });
          showToast("success", "Successfully denied user");
        },
        onError: (err) => {
          showToast("error", err.message);
        },
      },
    );
  };
  const accept = (userId: number) => {
    acceptUser(
      { slug: slug, id: userId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["eventUsers", slug],
          });
          showToast("success", "Successfully accepted user");
        },
        onError: (err) => {
          showToast("error", err.message);
        },
      },
    );
  };

  const thumbnailImage =
    eventUser?.owner?.images?.find((img: any) => img.type == "thumbnail")
      ?.path || "/assets/placeholder.svg";

  return (
    <tr className="hover:bg-slate-50">
      <td className="border-b border-slate-300 px-2 py-2">
        {eventUser?.owner.username}
      </td>
      <td className="border-b border-slate-300 px-2 py-2">
        {eventUser?.owner.email}
      </td>
      <td className="border-b border-slate-300 px-2 py-2">
        {eventUser?.owner.phoneNumber}
      </td>
      <td className="border-b border-slate-300 px-2 py-2">
        {eventUser?.owner.type === "partner"
          ? "Хамтрагч"
          : eventUser?.owner.type === "volunteer"
            ? "Сайн дурын ажилтан"
            : "Дэмжигч"}
      </td>
      <td className="border-b border-slate-300 px-2 py-2">
        {format(eventUser?.createdAt, "yyyy/MM/dd HH:mm")}
      </td>
      <td width={150} className="border-b border-slate-300 px-2 py-2 bg-red-6">
        <div className="flex gap-2">
          <Modal
            className="min-w-[500px]"
            headerLabel={"Хэрэглэгчийн мэдээлэл"}
            triggerLabel={"Үзэх"}
            triggerClassName={""}
            triggerIcon={<BookOpenIcon color="#3c888d" />}
            triggerVariant={"outline"}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-start gap-4 mb-4">
                <div className="relative min-w-[100px] min-h-[100px] max-w-[120px]">
                  <Image
                    src={thumbnailImage}
                    alt="profile"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-[14px] text-gray-700 space-y-1">
                  <div className="flex gap-2 items-center">
                    <p className="font-medium">{eventUser.owner.username}</p>
                    <span
                      className={`rounded-full capitalize py-1 text-sm px-2 bg-primary text-white`}
                    >
                      {eventUser.userType}
                    </span>
                    {eventUser?.userType === "volunteer" ? (
                      <span
                        className={`rounded-full py-1 text-sm px-2 bg-primary text-white`}
                      >
                        Level: {eventUser?.owner?.level}
                      </span>
                    ) : (
                      <span
                        className={`rounded-full py-1 text-sm px-2 bg-primary text-white`}
                      >
                        {eventUser?.owner?.organizationType}
                      </span>
                    )}
                    {eventUser?.userType === "volunteer" && (
                      <span
                        className={`rounded-full py-1 text-sm px-2 bg-primary text-white`}
                      >
                        Хүйс: ЭР
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <PhoneIcon color="#64748b" width={18} height={18} />
                    <p className="">{eventUser?.owner?.phoneNumber}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <EnvelopeIcon color="#64748b" width={18} height={18} />
                    <p className="">{eventUser?.owner?.email}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MapPinIcon color="#64748b" width={18} height={18} />
                    <p className="">
                      {eventUser?.owner?.address?.country}
                      {` `}
                      {eventUser?.owner?.address?.region}
                      {` `}
                      {eventUser?.owner?.address?.address}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm">Танилцуулага:</p>
                <p className="text-sm text-gray-600">
                  {eventUser?.owner?.introduction}
                </p>
              </div>
              <div className="border-t flex justify-end mt-2 py-3 mr-2 gap-5">
                <Button
                  icon={<SingleCheckIcon color="#3c888d" />}
                  variant="outline"
                  component="button"
                  onClick={() => accept(eventUser.id)}
                >
                  Зөвшөөрөх
                </Button>
                <Button
                  icon={<Close color="#bc2626" />}
                  variant="outline"
                  component="button"
                  color="red"
                  onClick={() => deny(eventUser.id)}
                >
                  Татгалзах
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export const EventUserComp = ({ slug }: { slug: string }) => {
  const params = useSearchParams();
  const state = params.get("state");
  const page = params.get("page");

  const { data, isLoading, refetch } = useFetchEventUsers(slug, {
    state: state,
    page: page,
  });

  const eventUsers = data?.["hydra:member"];

  useEffect(() => {
    refetch;
  }, [state, page]);

  return (
    <MainLayout>
      <div className="w-full border-l-4 border-yellow-400 flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 ml-2">
          <IconButton
            component="link"
            className="p-[2px]"
            icon={<ArrowLeft width={20} height={20} color="#3c888d" />}
            href={`/events/${slug}`}
            variant="outline"
          />
          <h1 className="font-semibold">Арга хэмжээ</h1>
        </div>
      </div>
      <div className="space-y-5">
        <StateTab states={states} baseUri={`/events/${slug}/users?page=1`} />
        <div className="overflow-x-auto">
          <table
            className="table border-collapse border border-slate-300 w-full bg-white"
            align="left"
          >
            <thead>
              <tr className="text-left bg-primary text-white border border-primary-500">
                <th className="border-b border-primary-500 px-2 py-2 font-medium">
                  Нэр
                </th>
                <th className="border-b border-primary-500 px-2 py-2 font-medium">
                  Имэйл
                </th>
                <th className="border-b border-primary-500 px-2 py-2 font-medium">
                  Утас
                </th>
                <th className="border-b border-primary-500 px-2 py-2 font-medium">
                  Хэрэглэгч
                </th>
                <th className="border-b border-primary-500 px-2 py-2 font-medium">
                  Огноо
                </th>
                <th className="border-b border-primary-500 px-2 py-2 font-medium">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {eventUsers &&
                eventUsers?.length > 0 &&
                eventUsers?.map((user, i) => (
                  <TableRow slug={slug} eventUser={user} key={i} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};
