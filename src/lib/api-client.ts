import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_APP_API_KEY,
      },
    });

    // Setup interceptors
    this.client.interceptors.request.use(
      (config) => this.handleRequest(config),
      this.handleError
    );
    this.client.interceptors.response.use(this.handleResponse, this.handleError);
  }

  // Request interceptor to add token if present
  private handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  // Handle successful response
  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  // Global error handler
  private handleError = (error: any) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, logging out...');
      // Handle logout here
    }
    return Promise.reject(error);
  };

  // Generic GET method
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  // Generic POST method
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  // Generic PUT method
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  // Generic DELETE method
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  // Generic PATCH method
  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
}

const apiClient = new ApiClient(import.meta.env.VITE_APP_BASE_URL); // Set the base URL of your API here
export default apiClient;