import axios from 'axios';
import { useAuthStore } from '@shared/store/authStore';
import { ENV } from '../config/env';
export class ApiError extends Error {
    status;
    code;
    details;
    constructor(message, status, code, details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
export const httpClient = axios.create({
    baseURL: ENV.apiBaseUrl,
    timeout: 30_000,
    headers: { 'Content-Type': 'application/json' },
});
httpClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
httpClient.interceptors.response.use((r) => r, (error) => {
    const status = error.response?.status ?? 0;
    const message = error.response?.data?.message ?? error.message ?? 'Network error. Please try again.';
    if (status === 401) {
        useAuthStore.getState().logout();
    }
    return Promise.reject(new ApiError(message, status, error.response?.data?.code, error.response?.data?.details));
});
