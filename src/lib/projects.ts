"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchMyProjects = async (filter: any) => {
  const token = getCookie("token");
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?myCreated=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const projects = JSON.parse(res.data);
  console.log(projects);
  return projects?.["hydra:member"];
};

export const useFetchMyProjects = (filter: any) => {
  return useQuery({
    queryKey: ["myProjects", filter],
    queryFn: () => fetchMyProjects(filter),
  });
};
