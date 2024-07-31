"use server";

import {
  ValidateRequest,
  validateResponseSchema,
  ValidateResponse,
} from "@/types/api/application/validate";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "application/validate";

export async function validate(
  input: ValidateRequest,
): Promise<ValidateResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/${SERVICE_ENDPOINT}`, {
      params: input,
    });
    const validateResponse = validateResponseSchema.parse(response.data);
    return validateResponse;
    // TODO: More robust error handling + consider whether we want to rethrow it
  } catch (error) {
    console.error(error);
    throw error;
  }
}
