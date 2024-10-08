"use server";

import {
  SelectApplicationRequest,
  SelectApplicationResponse,
  selectApplicationResponseSchema,
} from "@/types/actions/application/select";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVICE_ENDPOINT = "application/select";

export async function selectApplication(
  input: SelectApplicationRequest,
): Promise<SelectApplicationResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
    const selectApplicationResponse = selectApplicationResponseSchema.parse(
      response.data,
    );
    return selectApplicationResponse;
  } catch (error) {
    throw error;
  }
}
