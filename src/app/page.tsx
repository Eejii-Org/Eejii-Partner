"use client";

import { Loader } from "@/components/loader";
import { MainLayout } from "@/components/main-layout";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getHomeStats } from "@/actions/partner-actions";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { SubscriptionType } from "@/types";
import { formatPrice } from "@/utils/format-price";
import { EventsIcon } from "@/components/icons/events";
import { MapPinIcon } from "@/components/icons/map-pin";
import { Button } from "@/components/button";
import { PencilSimpleIcon } from "@/components/icons/pencil-simple";
import { getSubscription } from "@/actions/actions";
import { ProgressBar } from "@/components/progress";

export default function Home() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const { user, userLoading } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      const token = getCookie("token");
      if (!token) return;
      const res = await getHomeStats();
      setStats(res);
    };
    fetchStats();
  }, [user]);

  const aboutImage =
    user?.images?.find((img: any) => img.type == "about")?.path ||
    "/assets/placeholder.svg";

  if (userLoading) {
    return <Loader />;
  }
  if (!user) {
    router.push("/auth");
    return <div></div>;
  }
  return (
    <MainLayout>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <div className="bg-white flex gap-5 justify-between rounded-2xl p-3 shadow-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium text-sm">
              Төсөл хөтөлбөр, Арга хэмжээ
            </span>
            <span className="font-semibold text-lg">
              {(stats?.totalProjects ?? 0) + stats?.totalEvents ?? 0}
            </span>
          </div>
          <div className="flex items-center p-2 bg-primary rounded-lg">
            <EventsIcon color="white" />
          </div>
        </div>
        <div className="bg-white flex gap-5 justify-between rounded-2xl p-3 shadow-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium text-sm">
              Нийт хандив
            </span>
            <span className="font-semibold text-lg">
              {formatPrice(stats?.totalDonations ?? 0, "MNT")}
            </span>
          </div>
          <div className="flex items-center p-2 bg-primary rounded-lg">
            <EventsIcon color="white" />
          </div>
        </div>
        <div className="bg-white flex gap-5 justify-between rounded-2xl p-3 shadow-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium text-sm">
              Нийт сайн дурын ажилчид
            </span>
            <span className="font-semibold text-lg">
              {stats?.totalVolunteers ?? 0}
            </span>
          </div>
          <div className="flex items-center p-2 bg-primary rounded-lg">
            <EventsIcon color="white" />
          </div>
        </div>
      </div>
      {/* ABOUT */}
      <div className="bg-white flex gap-5 justify-between rounded-2xl p-5 shadow-sm mt-5">
        <div className="flex flex-col w-full justify-between gap-5 md:flex-row">
          <div className="">
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-gray-500 my-2">{user?.organizationType}</p>
            <div className="flex gap-1 items-center">
              <MapPinIcon width={20} height={20} />
              <span className="text-gray-500 text-md">
                {user.address.region} {user.address.address}
              </span>
            </div>
            <p className="my-4">{user.bio}</p>
            <Button
              component="button"
              variant="outline"
              icon={<PencilSimpleIcon />}
            >
              Засах
            </Button>
          </div>
          <div className="min-w-[480px] min-h-[400px] rounded-2xl overflow-hidden relative max-md:hidden">
            <Image
              src={aboutImage}
              alt="partner-about"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {/* PERMIT STATS */}
      <PermitStats stats={stats} />
    </MainLayout>
  );
}

const PermitStats = ({ stats }: { stats: any }) => {
  const { user, userLoading } = useAuth();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionType | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;
      try {
        const res = await getSubscription(user?.subscriptionId as number);
        setSubscriptionData(res && res);
      } catch (e) {
        console.error(e);
        setSubscriptionData(null);
      }
    };
    fetchSubscription();
  }, [user]);

  const totalNewEvents =
    stats?.progress?.events?.find((e: any) => e?.state === "new")?.total ?? 0;
  const totalNewProjects =
    stats?.progress?.projects?.find((e: any) => e?.state === "new")?.total ?? 0;

  const totalDoneEvents =
    stats?.progress?.events?.find((e: any) => e?.state === "done")?.total ?? 0;
  const totalDoneProjects =
    stats?.progress?.projects?.find((e: any) => e?.state === "done")?.total ??
    0;

  const doneProjectsPercent =
    totalDoneProjects > 0
      ? (totalDoneProjects * 100) / stats?.totalProjects
      : 0;
  const doneEventsPercent =
    totalDoneEvents > 0 ? (totalDoneEvents * 100) / stats?.totalEvents : 0;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
      <div className="flex flex-col xl:flex-row gap-5 w-full">
        <div className="w-full bg-yellow-400 rounded-2xl p-6 flex flex-col justify-between">
          <p className="text-white font-medium text-xl">Төсөл хөтөлбөр</p>
          <p className="text-white font-medium text-[34px] xl:text-[66] mt-3">
            {totalNewProjects} шинэ
          </p>
          <ProgressBar
            label="Done"
            percent={doneProjectsPercent}
            bg="bg-yellow-500"
            color="bg-white"
            textColor="white"
          />
        </div>
        <div className="w-full bg-lime-500 rounded-2xl p-6 flex flex-col justify-between">
          <p className="text-white font-medium text-xl">Арга хэмжээ</p>
          <p className="text-white font-medium text-[34px] xl:text-[66] mt-3">
            {totalNewEvents} шинэ
          </p>
          <ProgressBar
            label={`Done`}
            percent={doneEventsPercent}
            bg="bg-lime-600"
            color="bg-white"
            textColor="white"
          />
        </div>
      </div>
      <div className="bg-white flex flex-col md:flex-row gap-5 justify-between rounded-2xl p-5 shadow-sm ">
        <div className="min-w-[400px]">
          <div className="w-full md:w-auto mb-3">
            <h2 className="text-xl font-semibold text-start">
              Бусад үйл ажиллагаа
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-5 bg-primary-50 rounded-lg w-full flex flex-col justify-between gap-5">
              <p className="text-gray-500 font-medium text-sm">
                Сайн дурын үйл ажиллагаа
              </p>
              <div className="border-s-4 border-primary-600 flex justify-end">
                <span className="text-2xl font-semibold text-primary-600">
                  {user?.volunteeringEventPermit}/
                  {subscriptionData?.maxVolunteeringEvent}
                </span>
              </div>
            </div>
            <div className="p-5 bg-primary-50 rounded-lg w-full flex flex-col justify-between gap-5">
              <p className="text-gray-500 font-medium text-sm">Арга хэмжээ</p>
              <div className="border-s-4 border-primary-600 flex justify-end">
                <span className="text-2xl font-semibold text-primary-600">
                  {user?.eventPermit}/{subscriptionData?.maxEvent}
                </span>
              </div>
            </div>
            <div className="p-5 bg-primary-50 rounded-lg w-full flex flex-col justify-between gap-5">
              <p className="text-gray-500 font-medium text-sm">
                Хандивын төсөл
              </p>
              <div className="border-s-4 border-primary-600 flex justify-end">
                <span className="text-2xl font-semibold text-primary-600">
                  {user?.fundraisingPermit}/{subscriptionData?.maxFundraising}
                </span>
              </div>
            </div>
            <div className="p-5 bg-primary-50 rounded-lg w-full flex flex-col justify-between gap-5">
              <p className="text-gray-500 font-medium text-sm">
                Хандив босгох төсөл
              </p>
              <div className="border-s-4 border-primary-600 flex justify-end">
                <span className="text-2xl font-semibold text-primary-600">
                  {user?.grantFundraisingPermit}/
                  {subscriptionData?.maxGrantFundraising}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
