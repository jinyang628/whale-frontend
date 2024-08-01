"use server";

import {
  CreateRequest,
  CreateResponse,
  createResponseSchema,
} from "@/types/api/message/create";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "message/create";

export async function sendCreateMessage(
  input: CreateRequest,
): Promise<CreateResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    const createResponse = createResponseSchema.parse(response.data);
    return createResponse;
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
