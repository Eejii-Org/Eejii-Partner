"use client";
import { EventInputs } from "@/schemas/eventSchema";
import {
  HydraCollectionType,
  ImageType,
  EventType,
  EventUserType,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchMyEvents = async (filters: any) => {
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res.status > 299) {
    throw new Error(res?.data?.message ?? "Error while fetching events");
  }
  return res.data;
};

export const fetchEvent = async (slug: string) => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}`)
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.data);
      }
    });

  return res?.data;
};

export const fetchEventUsers = async (slug: string, filters: any) => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/eventUsers?${queryString}`,
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

export const createEvent = async (
  type: "event" | "volunteering_event",
  formData: EventInputs,
) => {
  const token = getCookie("token");
  const body = {
    ...formData,
    type: type,
    goalAmount: formData.goalAmount?.toString(),
    currentAmount: formData.currentAmount,
  };

  const res = await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/new`, body, {
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

export const editEvent = async (slug: string, formData: EventInputs) => {
  const token = getCookie("token");
  const body = {
    ...formData,
    goalAmount: formData.goalAmount?.toString(),
    currentAmount: formData.currentAmount?.toString(),
  };

  const res = await axios
    .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}`, body, {
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

export const acceptEventUser = async (slug: string, id: number) => {
  const token = getCookie("token");

  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/eventUsers/${id}/accept`,
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

export const denyEventUser = async (slug: string, id: number) => {
  const token = getCookie("token");

  const res = await axios
    .put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/eventUsers/${id}/deny`,
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

export const addEventImage = async (type: string, slug: string, file: File) => {
  const token = getCookie("token");
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file);

  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/images/new`,
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

export const deleteEventImage = async (slug: string, id: number) => {
  const token = getCookie("token");

  await axios
    .delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/images/${id}`,
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

export const useFetchMyEvents = (filters: any) => {
  return useQuery<HydraCollectionType<EventType[]>, Error>({
    queryKey: ["myEvents", filters],
    queryFn: () => fetchMyEvents(filters),
  });
};

export const useFetchEvent = (slug: string) => {
  return useQuery<EventType, Error>({
    queryKey: ["event", slug],
    queryFn: () => fetchEvent(slug),
  });
};

export const useFetchEventUsers = (slug: string, filters: any) => {
  return useQuery<HydraCollectionType<EventUserType[]>, Error>({
    queryKey: ["eventUsers", slug],
    queryFn: () => fetchEventUsers(slug, filters),
  });
};

export const useEditEvent = () => {
  return useMutation<EventType, Error, { slug: string; formData: EventInputs }>(
    {
      mutationKey: ["createEvent"],
      mutationFn: ({ slug, formData }) => editEvent(slug, formData),
    },
  );
};

export const useCreateEvent = () => {
  return useMutation<
    EventType,
    Error,
    { type: "event" | "volunteering_event"; formData: EventInputs }
  >({
    mutationKey: ["createEvent"],
    mutationFn: ({ type, formData }) => createEvent(type, formData),
  });
};

export const useAddEventImage = () => {
  return useMutation<
    ImageType,
    Error,
    { type: string; slug: string; file: File }
  >({
    mutationKey: ["addEventImage"],
    mutationFn: ({ type, slug, file }) => addEventImage(type, slug, file),
  });
};

export const useDeleteEventImage = () => {
  return useMutation<void, Error, { slug: string; id: number }>({
    mutationKey: ["deleteEventImage"],
    mutationFn: ({ slug, id }) => deleteEventImage(slug, id),
  });
};

export const useDenyEventUser = () => {
  return useMutation<any, Error, { slug: string; id: number }>({
    mutationKey: ["createEvent"],
    mutationFn: ({ slug, id }) => denyEventUser(slug, id),
  });
};

export const useAcceptEventUser = () => {
  return useMutation<any, Error, { slug: string; id: number }>({
    mutationKey: ["createEvent"],
    mutationFn: ({ slug, id }) => acceptEventUser(slug, id),
  });
};
