"use server";

import {
  UseRequest,
  UseResponse,
  useResponseSchema,
} from "@/types/actions/message/use";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "message/use";

export async function sendUseMessage(input: UseRequest): Promise<UseResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    const sendMessageResponse = useResponseSchema.parse(response.data);
    return sendMessageResponse;
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
