"use server";

import { ReverseActionWrapper } from "@/types/actions/message/reverse";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "message/reverse";

export async function reverseInference(input: ReverseActionWrapper) {
  try {
    await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
