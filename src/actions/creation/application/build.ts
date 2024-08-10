"use server";

import { ApplicationContent } from "@/types/actions/application/base";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "application/build";

export async function build(input: ApplicationContent) {
  try {
    await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
