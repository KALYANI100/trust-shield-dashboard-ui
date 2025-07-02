// src/lib/axios.ts
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiErrorResponse {
  status?: number;
  message: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

interface ApiResponseData {
  token?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  [key: string]: unknown;
}

const instance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Request Interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.url !== '/auth/me') {
      console.log(`[AXIOS] ${config.method?.toUpperCase()} ${config.url}`);
    }

    const token = localStorage.getItem('token');
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('[AXIOS] Request error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponseData>): AxiosResponse<ApiResponseData> => {
    const token = response.data?.token;
    if (token) {
      localStorage.setItem('token', token);
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response;
  },
  (error): Promise<never> => {
    // ✅ Type-safe Axios error check
    if (axios.isAxiosError(error)) {
      const config = error.config;
      const response = error.response;
      const message = error.message;
      const code = error.code;

      // ✅ Handle network error (no response)
      if (!response) {
        console.error('[AXIOS] Network Error:', {
          message,
          code,
          url: config?.url,
        });

        const networkError: ApiErrorResponse = {
          message: 'Network error. Please check your connection.',
          status: 0,
        };

        return Promise.reject(networkError);
      }

      // ✅ Type-safe handling of server error
      const status = response.status;
      const data = response.data as ApiErrorResponse;

      console.error(`[AXIOS] HTTP ${status} Error:`, data?.message || 'Unknown error');

      // ✅ Handle 401 Unauthorized
      if (status === 401 && !config?.url?.includes('auth')) {
        localStorage.removeItem('token');
        delete instance.defaults.headers.common['Authorization'];

        if (!window.location.pathname.includes('login')) {
          window.location.href = '/login';
          const authError: ApiErrorResponse = {
            message: 'Session expired. Please login again.',
            status: 401,
          };
          return Promise.reject(authError);
        }
      }

      const apiError: ApiErrorResponse = {
        status,
        message: data?.message || `Request failed with status ${status}`,
        ...(data?.errors && { errors: data.errors }),
        ...data,
      };

      return Promise.reject(apiError);
    }

    // ⚠️ Fallback: Unknown error, not AxiosError
    const fallbackError: ApiErrorResponse = {
      message: 'An unexpected error occurred.',
      status: 500,
    };

    return Promise.reject(fallbackError);
  }
);

// 🧠 Extend Axios methods for proper intellisense
declare module 'axios' {
  export interface AxiosInstance {
    request<T = ApiResponseData>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = ApiResponseData>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = ApiResponseData>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = ApiResponseData>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = ApiResponseData>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T = ApiResponseData>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }
}

export default instance;
