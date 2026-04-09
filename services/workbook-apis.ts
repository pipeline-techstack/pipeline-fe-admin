import { getToken } from "@/lib/auth";

export const getWorkbooks = async ({
  page,
  page_size,
  id,
}: {
  page?: number;
  page_size?: number;
  id: string;
}): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  console.log("wb api called from getworkbooks")
  let url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/workbooks/${id}?page=${page}&page_size=${page_size}`;

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
