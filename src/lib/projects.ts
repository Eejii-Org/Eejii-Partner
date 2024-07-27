"use client";
import { ProjectInputs } from "@/schemas/projectSchema";
import {
  HydraCollectionType,
  ImageType,
  ProjectType,
  ProjectUserType,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchMyProjects = async (filters: any) => {
  const token = getCookie("token");
  let queryString = `myCreated=true`;

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== null && value !== undefined) {
        queryString += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res.status > 299) {
    throw new Error(res?.data?.message ?? "Error while fetching projects");
  }
  return res.data;
};

export const fetchProject = async (slug: string) => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}`)
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const fetchProjectUsers = async (slug: string, filters: any) => {
  const token = getCookie("token");
  let queryString = ``;

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== null && value !== undefined) {
        queryString += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}/projectUsers?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const createProject = async (
  type: "fundraising" | "grant_fundraising",
  formData: ProjectInputs,
) => {
  const token = getCookie("token");
  const body = {
    ...formData,
    type: type,
    goalAmount: formData.goalAmount?.toString(),
    currentAmount: formData.currentAmount,
  };

  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/new`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const editProject = async (slug: string, formData: ProjectInputs) => {
  const token = getCookie("token");
  const body = {
    ...formData,
    goalAmount: formData.goalAmount?.toString(),
    currentAmount: formData.currentAmount?.toString(),
  };

  const res = await axios
    .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const acceptProjectUser = async (slug: string, id: number) => {
  const token = getCookie("token");

  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}/projectUsers/${id}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const denyProjectUser = async (slug: string, id: number) => {
  const token = getCookie("token");

  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}/projectUsers/${id}/deny`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const addProjectImage = async (
  type: string,
  slug: string,
  file: File,
) => {
  const token = getCookie("token");
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file);

  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}/images/new`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    )
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const deleteProjectImage = async (slug: string, id: number) => {
  const token = getCookie("token");

  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}/images/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });
};

export const useFetchMyProjects = (filters: any) => {
  return useQuery<HydraCollectionType<ProjectType[]>, Error>({
    queryKey: ["myProjects", filters],
    queryFn: () => fetchMyProjects(filters),
  });
};

export const useFetchProject = (slug: string) => {
  return useQuery<ProjectType, Error>({
    queryKey: ["project", slug],
    queryFn: () => fetchProject(slug),
  });
};

export const useFetchProjectUsers = (slug: string, filters: any) => {
  return useQuery<HydraCollectionType<ProjectUserType[]>, Error>({
    queryKey: ["projectUsers", slug],
    queryFn: () => fetchProjectUsers(slug, filters),
  });
};

export const useEditProject = () => {
  return useMutation<
    ProjectType,
    Error,
    { slug: string; formData: ProjectInputs }
  >({
    mutationKey: ["createProject"],
    mutationFn: ({ slug, formData }) => editProject(slug, formData),
  });
};

export const useCreateProject = () => {
  return useMutation<
    ProjectType,
    Error,
    { type: "fundraising" | "grant_fundraising"; formData: ProjectInputs }
  >({
    mutationKey: ["createProject"],
    mutationFn: ({ type, formData }) => createProject(type, formData),
  });
};

export const useAddProjectImage = () => {
  return useMutation<
    ImageType,
    Error,
    { type: string; slug: string; file: File }
  >({
    mutationKey: ["addProjectImage"],
    mutationFn: ({ type, slug, file }) => addProjectImage(type, slug, file),
  });
};

export const useDeleteProjectImage = () => {
  return useMutation<void, Error, { slug: string; id: number }>({
    mutationKey: ["deleteProjectImage"],
    mutationFn: ({ slug, id }) => deleteProjectImage(slug, id),
  });
};

export const useDenyProjectUser = () => {
  return useMutation<any, Error, { slug: string; id: number }>({
    mutationKey: ["createProject"],
    mutationFn: ({ slug, id }) => denyProjectUser(slug, id),
  });
};

export const useAcceptProjectUser = () => {
  return useMutation<any, Error, { slug: string; id: number }>({
    mutationKey: ["createProject"],
    mutationFn: ({ slug, id }) => acceptProjectUser(slug, id),
  });
};
