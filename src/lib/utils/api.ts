interface ApiError {
  message: string;
  status: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

import { refreshToken, removeToken } from "./auth";
import { storage } from "./storage";
const BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_ENDPOINT || "http://192.168.1.59:5000/api";

export interface ApiOptions extends RequestInit {
  responseType?: "json" | "blob" | "text";
}

async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const token = storage.get("token");
  const headers: HeadersInit = {
    ...(!(options.body instanceof FormData) && {
      "Content-Type": "application/json",
    }),
    Accept: options.responseType === "blob" ? "*/*" : "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      mode: "cors",
      credentials: "same-origin",
    });

    if (response.status === 423) {
      await refreshToken();
      return apiClient(endpoint, options);
    }

    if (response.status === 401 || response.status === 403) {
      removeToken();
      window.location.href = "/admin/login";
      return {
        data: null,
        error: { message: "Unauthorized", status: 401 },
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: {
          message: errorData.message || errorData.detail || "An error occurred",
          status: response.status,
        },
      };
    }

    if (
      options.responseType === "blob" ||
      endpoint.includes("export") ||
      (endpoint.includes("docs") && endpoint.includes("doc_type=pdf"))
    ) {
      const blob = await response.blob();
      return { data: blob as T, error: null };
    }

    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Network error",
        status: 500,
      },
    };
  }
}

const uploadFile = async (
  endpoint: string,
  file: File,
  onProgress?: (percentage: number) => void
): Promise<ApiResponse<any>> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const xhr = new XMLHttpRequest();
    const token = storage.get("token");

    return new Promise((resolve, reject) => {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          const percentage = (e.loaded / e.total) * 100;
          onProgress(Math.round(percentage));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 401) {
          removeToken();
          // window.location.href = '/';
          resolve({
            data: null,
            error: { message: "Unauthorized", status: 401 },
          });
        }

        const response = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ data: response, error: null });
        } else {
          resolve({
            data: null,
            error: {
              message: response.message || "Upload failed",
              status: xhr.status,
            },
          });
        }
      };

      xhr.onerror = () => {
        resolve({
          data: null,
          error: { message: "Network error", status: 500 },
        });
      };

      xhr.open("POST", `${BASE_URL}${endpoint}`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);
    });
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Upload failed",
        status: 500,
      },
    };
  }
};

const convertToFormData = (data: any): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object") {
          Object.entries(item).forEach(([subKey, subValue]: any) => {
            formData.append(`${key}[${index}][${subKey}]`, subValue);
          });
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        formData.append(`${key}[${subKey}]`, subValue);
      });
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  }
  return formData;
};

export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data: unknown, options?: any) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: options?.withFormData
        ? convertToFormData(data)
        : JSON.stringify(data),
      headers: options?.withFormData
        ? undefined
        : {
          "Content-Type": "application/json",
          ...options?.headers,
        },
    }),

  put: <T>(endpoint: string, data: unknown, options?: any) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: options?.withFormData
        ? convertToFormData(data)
        : JSON.stringify(data),
      headers: options?.withFormData
        ? undefined
        : {
          "Content-Type": "application/json",
          ...options?.headers,
        },
    }),

  patch: <T>(endpoint: string, data: unknown, options?: any) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: options?.withFormData
        ? convertToFormData(data)
        : JSON.stringify(data),
      headers: options?.withFormData
        ? undefined
        : {
          "Content-Type": "application/json",
          ...options?.headers,
        },
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),

  upload: (
    endpoint: string,
    file: File,
    onProgress?: (percentage: number) => void
  ) => uploadFile(endpoint, file, onProgress),
};
