"use server";

import { BannerPositionType, UserType } from "@/types";
import axios from "axios";

/*
  Subscription
*/
export const getSubscription = async (id: number) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions/${id}`,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/*
  Categories
*/
export const getCategories = async () => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
    );
    return res.data?.["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
  }
};

/*
  Banner
*/
export const getBanners = async (position: BannerPositionType) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banners?bannerPosition.code=${position}`,
    );
    return res.data["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
  }
};

// /*
//   Media
// */
// export const getMedias = async (page: number, q: string) => {
//   "use server";
//   return await axios.get(
//     `${
//       process.env.NEXT_PUBLIC_BACKEND_URL
//     }/api/media?order[startTime]=asc&limit=12&page=${page}${
//       q ? "&title=" + q : ""
//     }`,
//   );
// };

// export const getMediaByPartner = async (partnerId: number, limit: number) => {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media?order[startTime]=asc&limit=${limit}&owner.id=${partnerId}`,
//     );
//     return res.data["hydra:member"];
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// /*
//   Events
// */

// export const getEvents = async (
//   page: number,
//   q: string,
//   t: string,
//   category: string,
// ) => {
//   "use server";
//   return await axios.get(
//     `${
//       process.env.NEXT_PUBLIC_BACKEND_URL
//     }/api/events?state=new&order[startTime]=asc&type=${t}&isEnabled=true&limit=12&page=${page}${
//       category ? "&categories.slug=" + category : ""
//     }${q ? "&title=" + q : ""}`,
//   );
// };

// export const getFeaturedEvents = async () => {
//   "use server";
//   return await axios.get(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?state=new&isEnabled=true&limit=4&isFeatured=true`,
//   );
// };

// export const getEvent = async (slug: string) => {
//   "use server";
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}`,
//     );
//     return res.data;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// export const getEventUsers = async (slug: string) => {
//   "use server";
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/eventUsers`,
//     );
//     return res.data?.["hydra:member"];
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// /*
//   Events
// */

// export const getProjects = async (
//   page: number,
//   q: string,
//   t: string,
//   category: string,
// ) => {
//   "use server";
//   return await axios.get(
//     `${
//       process.env.NEXT_PUBLIC_BACKEND_URL
//     }/api/projects?state=new&isEnabled=true&order[startTime]=asc&type=${t}&limit=12&page=${page}${
//       q ? "&title=" + q : ""
//     }${category ? "&categories.slug=" + category : ""}`,
//   );
// };

// export const getFeaturedProjects = async () => {
//   "use server";
//   return await axios.get(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?state=new&isEnabled=true&limit=4&isFeatured=true`,
//   );
// };

export const getProject = async (slug: string) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}`,
    );
    return res;
  } catch (e) {
    console.error(e);
    return { data: null };
  }
};

// /*
//   Partners
// */
// export const getPartners = async () => {
//   "use server";
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/partners?state=accepted`,
//     );
//     return res.data?.["hydra:member"];
//   } catch (e) {
//     console.error(e);
//     return { data: null };
//   }
// };
// export const getPartner = async (id: string) => {
//   "use server";
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/partners/${id}`,
//     );
//     return res.data;
//   } catch (e) {
//     console.error(e);
//     return { data: null };
//   }
// };

// /*
//   Volunteers
// */
// export const getVolunteers = async (q: string, level: string, page: number) => {
//   "use server";

//   try {
//     const res = await axios.get(
//       `${
//         process.env.NEXT_PUBLIC_BACKEND_URL
//       }/api/volunteers?order[level]=desc&state=accepted&search=${q}&${
//         level ? "level=" + level : ""
//       }&page=${page || 1}`,
//     );
//     return {
//       pageLast: res.data?.["hydra:meta"].pagination.last,
//       data: res.data?.["hydra:member"],
//     };
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// export const getVolunteersCountry = async () => {
//   "use server";
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/volunteersByCountry`,
//     );
//     return res.data;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// /*
//   Supporters
// */

// export const getSupporters = async (q: string) => {
//   "use server";

//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/supporters?order[totalActivityCount]=desc&totalActivityCount[gt]=0&search=${q}`,
//     );
//     return res.data?.["hydra:member"];
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// export const getSupporterData = async (id: string) => {
//   "use server";

//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/activities`,
//     );
//     return res.data;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };
