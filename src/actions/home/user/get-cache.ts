"use server";

import {
  GetCacheRequest,
  getCacheResponseSchema,
  GetCacheResponse,
} from "@/types/actions/user/get-cache";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "user/cache/get";

export async function getCache(
  input: GetCacheRequest,
): Promise<GetCacheResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/${SERVICE_ENDPOINT}`, {
      params: input,
    });
    const getUserCache = getCacheResponseSchema.parse(response.data);
    return getUserCache;
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
