import { QueryProductGroupsResponse } from "./types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProductGroups = async (query: string) => {
  const response = await fetch(`${BACKEND_URL}/prompt/products`, {
    method: "post",
    body: JSON.stringify({
      query,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data as QueryProductGroupsResponse;
};
