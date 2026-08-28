import { apiClient } from "./api";

export async function getExceptionRules() {
    return apiClient<any[]>('/ExceptionRule');
}