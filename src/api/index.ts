import { PriceRange, QueryProductGroupsResponse } from "./types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProductGroups = async (query: string, price?: PriceRange) => {
  const response = await fetch(`${BACKEND_URL}/prompt/products`, {
    method: "post",
    body: JSON.stringify({
      query,
      price,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  return data as QueryProductGroupsResponse;
};

export const getSuggestions = async (query: string) => {
  const response = await fetch(`${BACKEND_URL}/prompt/suggestions`, {
    method: "post",
    body: JSON.stringify({
      query,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  return (await response.json()) as string[];
};
