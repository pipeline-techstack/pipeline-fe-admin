import { getToken } from "@/lib/auth";

export const getWorkbooks = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  let url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/workbooks?page=${page}&page_size=${limit}`;
  if (search?.trim()) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch workbooks");

  return res.json();
};
