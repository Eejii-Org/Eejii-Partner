"use client";
import { Banner, Button, ChevronRightIcon } from "@/components";
import { Loader } from "@/components/loader";
import { MainLayout } from "@/components/main-layout";
import { useAuth } from "@/providers";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Projects() {
  const { user, userLoading } = useAuth();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const state = searchParams.get("state");
  const router = useRouter();
  // const stateColor = "border-red-600";
  // const stateColor = "border-primary";
  const stateColor = "border-yellow-400";
  return (
    <MainLayout>
      <div className="space-y-5">
        <Banner
          label="Төсөл хөтөлбөрүүд"
          button={
            <Button
              variant="outline"
              onClick={() => router.push(`/projects/new?type=fundraising`)}
            >
              Төсөл нэмэх
            </Button>
          }
        />
        {/* TAB */}
        <div className="flex flex-row gap-5">
          <div
            className={`cursor-pointer text-lg px-1 font-bold pb-[7px] border-b-2  ${
              type == "fundraising"
                ? "border-primary text-primary"
                : "border-transparent text-black/30"
            }`}
            onClick={() => {
              router.push(`/projects?page=1&search=${search}&type=fundraising`);
            }}
          >
            Хандив өгөх
          </div>
          <div
            className={`cursor-pointer text-lg px-1 font-bold pb-[7px] border-b-2 border-primary ${
              type == "grant_fundraising"
                ? "border-primary text-primary"
                : "border-transparent text-black/30"
            }`}
            onClick={() => {
              router.push(
                `/projects?page=1&search=${search}&type=grant_fundraising`,
              );
            }}
          >
            Хандив авах
          </div>
        </div>
        {/* SEARCH */}
        <div className="">
          <input
            name="search"
            placeholder="Хайх"
            className="outline-none md:w-[600px] font-light bg-transparent focus:outline-none transition-all ease-in-out duration-150 text-lg focus:text-xl p-2 border-b-2 border-primary-50"
            onChange={(e) => {
              e.preventDefault();
              router.push(
                `/projects?page=1&type=${type}&search=${e.currentTarget.value}`,
              );
            }}
          />
          <p className="text-md mt-1 text-gray-400 font-light">
            Өөрийн олохыг хүсч буй төслөө нэр, байршил эсвэл огноогоор нь хайж
            олоорой
          </p>
        </div>
        {/* FILTER BADGE */}
        <Filter state={state} type={type} />
        {/* PROJECTS LIST */}
        <div>
          <div
            className={`bg-white rounded-xl px-5 py-4 flex flex-col gap-5 md:flex-row border-r-[12px] ${stateColor}`}
          >
            {/* DATE */}
            <div className="border-r border-gray-200 pl-3 pr-8 hidden md:block">
              <div className="py-5  flex flex-col text-center h-full justify-center items-center">
                <p className="text-[22px] tracking-wide font-light leading-4">
                  Sep
                </p>
                <p className="text-[34px]">04</p>
                <p className="text-[18px] font-light text-gray-500 leading-4">
                  2023
                </p>
              </div>
            </div>
            {/* INFO */}
            <div className="flex-auto py-4 space-y-3">
              <p className="border-l-2 border-primary px-2 font-light">
                Хандив өгөх төсөл
              </p>
              <h3 className="font-medium tracking-wide text-xl">
                Mother project Hospice /Palliative Care and training Cente
              </h3>
              <div className="font-light text-md flex gap-2">
                <p>Mon September 04, 2023</p>-<p>Mon September 25, 2023</p>
              </div>
            </div>
            {/* CATEGORIES */}
            <div className="flex-auto">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full px-2 py-1 bg-primary-700 text-gray-50">
                  Залуус
                </span>
                <span className="rounded-full px-2 py-1 bg-primary-700 text-gray-50">
                  Боловсрол
                </span>
                <span className="rounded-full px-2 py-1 bg-primary-700 text-gray-50">
                  Хүмүүнлэг
                </span>
              </div>
            </div>
            {/* BUTTON */}
            <div className="relative flex justify-between md:justify-center items-center p-5">
              <p className="md:absolute md:translate-x-1/3 top-0 left-0 text-gray-500 font-light">
                Pending
              </p>
              <button
                onClick={() => router.push(`/projects/asdf`)}
                className="relative border md:border-none rounded-full md:w-14 md:h-14 transition-all ease-in duration-150 md:hover:scale-110 hover:bg-gray-100"
              >
                <span className="md:absolute md:top-0 md:left-0 md:translate-x-[2px]">
                  <ChevronRightIcon width={56} height={56} stroke={1} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const Filter = ({
  state,
  type,
}: {
  state: string | null;
  type: string | null;
}) => {
  const router = useRouter();
  const states = [
    {
      value: null,
      label: "Бүгд",
    },
    {
      value: "new",
      label: "Шинэ",
    },
    {
      value: "pending",
      label: "Хүлээгдэж буй",
    },
    {
      value: "done",
      label: "Дууссан",
    },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {states.map((s, i) => (
        <button
          key={i}
          className={`border rounded-full px-2 py-1 transition-all ease-in duration-150
            ${state === s.value ? "border-primary-800 px-6 tracking-widest text-primary-800 hover:bg-primary-100 font-semibold" : "border-slate-600 text-slate-600 hover:bg-slate-200"}`}
          type="button"
          onClick={() => {
            if (s.value == null) {
              router.push(`/projects?page=1&type=${type}`);
            } else {
              router.push(`/projects?page=1&type=${type}&state=${s.value}`);
            }
          }}
        >
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
};
