"use server"

import { UpdateCacheRequest } from "@/types/api/user/update-cache";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const SERVICE_ENDPOINT = "user/cache/update"

export async function updateCache(input: UpdateCacheRequest) {
    try {
        await axios.patch(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    // TODO: More robust error handling + consider whether we want to rethrow it
    } catch (error) {
        console.error(error);
        throw error;
    }
}