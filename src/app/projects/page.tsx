"use client";
import { Banner, Button, ChevronRightIcon } from "@/components";
import { Loader } from "@/components/loader";
import { MainLayout } from "@/components/main-layout";
import { useFetchMyProjects } from "@/lib";
import { PaginationType, ProjectType } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Projects() {
  // PARAMS
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const state = searchParams.get("state");

  // FETCH PROJECTS
  const { data, isLoading, refetch } = useFetchMyProjects({
    state: state,
    search: search,
    page: page,
    type: type,
  });
  const projects = data?.["hydra:member"] as ProjectType[];
  const paginationData = data?.["hydra:meta"]?.["pagination"] as PaginationType;
  const totalPages = paginationData?.last;

  const router = useRouter();
  useEffect(() => {
    refetch();
  }, [type, search, page, state]);
  return (
    <MainLayout>
      <div className="space-y-5">
        <Banner
          label="Төсөл хөтөлбөрүүд"
          button={
            <Button
              component="link"
              variant="outline"
              href={`/projects/new?type=fundraising`}
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
              router.push(`/projects?page=1&type=fundraising`);
            }}
          >
            Хандив олох төсөл
          </div>
          <div
            className={`cursor-pointer text-lg px-1 font-bold pb-[7px] border-b-2 border-primary ${
              type == "grant_fundraising"
                ? "border-primary text-primary"
                : "border-transparent text-black/30"
            }`}
            onClick={() => {
              router.push(`/projects?page=1&type=grant_fundraising`);
            }}
          >
            Хандив өгөх төсөл
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
        <div className="space-y-5">
          {projects &&
            projects.length > 0 &&
            projects.map((project: ProjectType, i: number) => (
              <ProjectCard project={project} key={i} />
            ))}
        </div>
        <div className="flex items-center justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page, i) => (
              <Link
                href={buildUrl(type, search, page?.toString(), state)}
                key={i}
                className="text-lg p-2 bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center"
              >
                {page}
              </Link>
            ),
          )}
        </div>
      </div>
    </MainLayout>
  );
}

const buildUrl = (
  type: string | null,
  search: string | null,
  page: string | null,
  state: string | null,
) => {
  const params = new URLSearchParams();
  if (type !== null && type !== undefined && type !== "") {
    params.append("type", type);
  }

  // Add state parameter if state is not null
  if (state !== null && state !== undefined && state !== "") {
    params.append("state", state);
  }

  // Add search parameter if search is not null
  if (search !== null && search !== undefined && search !== "") {
    params.append("search", search);
  }

  if (page !== null && page !== undefined && page !== "") {
    params.append("page", page);
  }

  return `/projects?${params.toString()}`;
};

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
              router.push(`/projects?type=${type}&page=1`);
            } else {
              router.push(`/projects?type=${type}&state=${s.value}&page=1`);
            }
          }}
        >
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
};

const ProjectCard = ({ project }: { project: ProjectType }) => {
  let stateColor;
  if (project.state === "pending") {
    stateColor = "border-yellow-400";
  } else if (project.state === "new") {
    stateColor = "border-primary";
  } else if (project.state === "denied") {
    stateColor = "border-red-600";
  }

  const createdAt = new Date(project.createdAt);

  return (
    <div
      className={`bg-white rounded-xl px-5 py-4 flex flex-col gap-5 md:flex-row border-r-[12px] ${stateColor}`}
    >
      {/* DATE */}
      <div className="border-r border-gray-200 pl-3 pr-8 hidden md:block">
        <div className="py-5  flex flex-col text-center h-full justify-center items-center">
          <p className="text-[22px] tracking-wide font-light leading-4">
            {format(createdAt, "LLL")}
          </p>
          <p className="text-[34px]">{format(createdAt, "dd")}</p>
          <p className="text-[18px] font-light text-gray-500 leading-4">
            {format(createdAt, "y")}
          </p>
        </div>
      </div>
      {/* INFO */}
      <div className="flex-auto py-4 space-y-3">
        <p className="border-l-2 border-primary px-2 font-light">
          {project.type === "fundraising"
            ? "Хандив олох төсөл"
            : "Хандив өгөх төсөл"}
        </p>
        <h3 className="font-medium tracking-wide text-xl">{project.title}</h3>
        <div className="font-light text-md flex gap-2">
          <p>{format(project.startTime, "E LLLL dd, y")}</p>-
          <p>{format(project.endTime, "E LLLL dd, y")}</p>
        </div>
      </div>
      {/* CATEGORIES */}
      <div className="flex-auto">
        <div className="flex flex-wrap gap-2">
          {project.categories &&
            project.categories.length > 0 &&
            project.categories.map((c, i) => (
              <span
                className="rounded-full px-2 py-1 bg-primary-700 text-gray-50"
                key={i}
              >
                {c?.name}
              </span>
            ))}
        </div>
      </div>
      {/* BUTTON */}
      <div className="relative flex justify-between md:justify-center items-center p-5">
        <p className="md:absolute md:translate-x-1/3 top-0 left-0 text-gray-500 font-light">
          {project.state === "new"
            ? "New"
            : project.state === "denied"
              ? "Denied"
              : "Pending"}
        </p>
        <Link
          href={`/projects/${project?.slug}`}
          className="relative border md:border-none rounded-full md:w-14 md:h-14 transition-all ease-in duration-150 md:hover:scale-110 hover:bg-gray-100"
        >
          <span className="md:absolute md:top-0 md:left-0 md:translate-x-[2px]">
            <ChevronRightIcon width={56} height={56} stroke={1} />
          </span>
        </Link>
      </div>
    </div>
  );
};
