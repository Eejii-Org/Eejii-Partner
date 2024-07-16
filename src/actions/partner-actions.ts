import axios from "axios";
import { getCookie } from "cookies-next";

export const getHomeStats = async () => {
  const token = getCookie("token");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/partner/home`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.data;
  } catch (e) {
    console.error(e);
    return { data: null };
  }
};
