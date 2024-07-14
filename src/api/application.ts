import { SelectApplicationRequest, SelectApplicationResponse, selectApplicationResponseSchema } from "@/types/api/application";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const SERVICE_ENDPOINT = "application/select"

export async function selectApplication(input: SelectApplicationRequest): Promise<SelectApplicationResponse> {
    try {
        const response = await axios.get(`${BASE_URL}/${SERVICE_ENDPOINT}`, {
            params: input 
        });
        console.log(response);
        const selectApplicationResponse = selectApplicationResponseSchema.parse(response.data)
        return selectApplicationResponse;
    // TODO: More robust error handling + consider whether we want to rethrow it
    } catch (error) {
        console.error(error);
        throw error;
    }
}