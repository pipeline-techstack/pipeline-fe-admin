import { getToken } from "@/lib/auth";
import {
  PostUserResourcesPyaload,
  User,
} from "@/lib/types/resource-types";

type ApiResponse<T> = {
  status: boolean;
  data: T;
};

export const getUserResources = async (): Promise<
  ApiResponse<User[]>
> => {
  try {
    const token = getToken();

    if (!token) {
      return {
        status: false,
        data: [],
      };
    }

    const url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/payment/admin/users`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return {
        status: false,
        data: [],
      };
    }

    const data: User[] = await res.json();

    return {
      status: true,
      data,
    };
  } catch (error) {
    console.error("getUserResources error:", error);

    return {
      status: false,
      data: [],
    };
  }
};

export const postUserResources = async (
  payload: PostUserResourcesPyaload
): Promise<ApiResponse<User[]>> => {
  try {
    const token = getToken();

    if (!token) {
      return {
        status: false,
        data: [],
      };
    }

    const url = `${process.env.NEXT_PUBLIC_ENRICHMENT_URL}/payment/admin/members/permissions/set`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        status: false,
        data: [],
      };
    }

    const data: User[] = await res.json();

    return {
      status: true,
      data,
    };
  } catch (error) {
    console.error("postUserResources error:", error);

    return {
      status: false,
      data: [],
    };
  }
};
