"use server";

import { FeedbackRequest } from "@/types/actions/feedback/form";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "feedback";

export async function submitFeedback(input: FeedbackRequest) {
  try {
    await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
