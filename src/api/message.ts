import { SendMessageRequest, SendMessageResponse, sendMessageResponseSchema } from "@/types/api/message";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const SERVICE_ENDPOINT = "message/send"

export async function sendMessage(input: SendMessageRequest): Promise<SendMessageResponse> {
    try {
        const response = await axios.post(`${BASE_URL}/${SERVICE_ENDPOINT}`, input);
        const selectApplicationResponse = sendMessageResponseSchema.parse(response.data)
        return selectApplicationResponse;
    // TODO: More robust error handling + consider whether we want to rethrow it
    } catch (error) {
        console.error(error);
        throw error;
    }
}