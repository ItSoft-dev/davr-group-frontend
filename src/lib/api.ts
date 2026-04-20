const DEFAULT_API_BASE = "http://5.129.205.241:8200";
const API_BASE = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE).replace(/\/$/, "");

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("admin_token");
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

// ---- Auth ----
export const authApi = {
  login: (username: string, password: string) =>
    request<{ access_token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  me: () => request<{ id: number; username: string; full_name: string }>("/api/auth/me"),
};

// ---- Public ----
export const publicApi = {
  getServices: () => request<any[]>("/api/services/"),
  getVehicles: () => request<any[]>("/api/fleet/vehicles"),
  getFleetFeatures: () => request<any[]>("/api/fleet/features"),
  getTestimonials: () => request<any[]>("/api/testimonials/"),
  getStats: () => request<any[]>("/api/content/stats"),
  getCompanyInfo: () => request<any[]>("/api/content/company-info"),
  getTimeline: () => request<any[]>("/api/content/timeline"),
  getValues: () => request<any[]>("/api/content/values"),
  getWhyChooseUs: () => request<any[]>("/api/content/why-choose-us"),
  getHero: () => request<any[]>("/api/content/hero"),
  getLegalPage: (slug: string) => request<any>(`/api/content/legal/${slug}`),
  submitContact: (data: any) =>
    request<any>("/api/contacts/", { method: "POST", body: JSON.stringify(data) }),
  submitQuote: (data: any) =>
    request<any>("/api/quotes/", { method: "POST", body: JSON.stringify(data) }),
};

// ---- Admin ----
export const adminApi = {
  getDashboard: () => request<any>("/api/dashboard/stats"),
  // Services
  getServices: () => request<any[]>("/api/services/"),
  createService: (data: any) =>
    request<any>("/api/services/", { method: "POST", body: JSON.stringify(data) }),
  updateService: (id: number, data: any) =>
    request<any>(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteService: (id: number) =>
    request<any>(`/api/services/${id}`, { method: "DELETE" }),
  // Fleet Vehicles
  getVehicles: () => request<any[]>("/api/fleet/vehicles"),
  createVehicle: (data: any) =>
    request<any>("/api/fleet/vehicles", { method: "POST", body: JSON.stringify(data) }),
  updateVehicle: (id: number, data: any) =>
    request<any>(`/api/fleet/vehicles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteVehicle: (id: number) =>
    request<any>(`/api/fleet/vehicles/${id}`, { method: "DELETE" }),
  // Fleet Features
  getFleetFeatures: () => request<any[]>("/api/fleet/features"),
  createFleetFeature: (data: any) =>
    request<any>("/api/fleet/features", { method: "POST", body: JSON.stringify(data) }),
  updateFleetFeature: (id: number, data: any) =>
    request<any>(`/api/fleet/features/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFleetFeature: (id: number) =>
    request<any>(`/api/fleet/features/${id}`, { method: "DELETE" }),
  // Testimonials
  getTestimonials: () => request<any[]>("/api/testimonials/all"),
  createTestimonial: (data: any) =>
    request<any>("/api/testimonials/", { method: "POST", body: JSON.stringify(data) }),
  updateTestimonial: (id: number, data: any) =>
    request<any>(`/api/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTestimonial: (id: number) =>
    request<any>(`/api/testimonials/${id}`, { method: "DELETE" }),
  // Stats
  getStats: () => request<any[]>("/api/content/stats"),
  createStat: (data: any) =>
    request<any>("/api/content/stats", { method: "POST", body: JSON.stringify(data) }),
  updateStat: (id: number, data: any) =>
    request<any>(`/api/content/stats/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteStat: (id: number) =>
    request<any>(`/api/content/stats/${id}`, { method: "DELETE" }),
  // Company Info
  getCompanyInfo: () => request<any[]>("/api/content/company-info"),
  createCompanyInfo: (data: any) =>
    request<any>("/api/content/company-info", { method: "POST", body: JSON.stringify(data) }),
  updateCompanyInfo: (id: number, data: any) =>
    request<any>(`/api/content/company-info/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCompanyInfo: (id: number) =>
    request<any>(`/api/content/company-info/${id}`, { method: "DELETE" }),
  // Timeline
  getTimeline: () => request<any[]>("/api/content/timeline"),
  createTimeline: (data: any) =>
    request<any>("/api/content/timeline", { method: "POST", body: JSON.stringify(data) }),
  updateTimeline: (id: number, data: any) =>
    request<any>(`/api/content/timeline/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTimeline: (id: number) =>
    request<any>(`/api/content/timeline/${id}`, { method: "DELETE" }),
  // Values
  getValues: () => request<any[]>("/api/content/values"),
  createValue: (data: any) =>
    request<any>("/api/content/values", { method: "POST", body: JSON.stringify(data) }),
  updateValue: (id: number, data: any) =>
    request<any>(`/api/content/values/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteValue: (id: number) =>
    request<any>(`/api/content/values/${id}`, { method: "DELETE" }),
  // Why Choose Us
  getWhyChooseUs: () => request<any[]>("/api/content/why-choose-us"),
  createWhyChooseUs: (data: any) =>
    request<any>("/api/content/why-choose-us", { method: "POST", body: JSON.stringify(data) }),
  updateWhyChooseUs: (id: number, data: any) =>
    request<any>(`/api/content/why-choose-us/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteWhyChooseUs: (id: number) =>
    request<any>(`/api/content/why-choose-us/${id}`, { method: "DELETE" }),
  // Hero
  getHero: () => request<any[]>("/api/content/hero/all"),
  createHero: (data: any) =>
    request<any>("/api/content/hero", { method: "POST", body: JSON.stringify(data) }),
  updateHero: (id: number, data: any) =>
    request<any>(`/api/content/hero/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteHero: (id: number) =>
    request<any>(`/api/content/hero/${id}`, { method: "DELETE" }),
  // Legal Pages
  getLegalPages: () => request<any[]>("/api/content/legal"),
  createLegalPage: (data: any) =>
    request<any>("/api/content/legal", { method: "POST", body: JSON.stringify(data) }),
  updateLegalPage: (id: number, data: any) =>
    request<any>(`/api/content/legal/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteLegalPage: (id: number) =>
    request<any>(`/api/content/legal/${id}`, { method: "DELETE" }),
  // Contacts
  getContacts: () => request<any[]>("/api/contacts/"),
  markContactRead: (id: number) =>
    request<any>(`/api/contacts/${id}/read`, { method: "PUT" }),
  deleteContact: (id: number) =>
    request<any>(`/api/contacts/${id}`, { method: "DELETE" }),
  // Quotes
  getQuotes: () => request<any[]>("/api/quotes/"),
  updateQuote: (id: number, data: any) =>
    request<any>(`/api/quotes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteQuote: (id: number) =>
    request<any>(`/api/quotes/${id}`, { method: "DELETE" }),
  // Upload
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return request<{ filename: string; url: string }>("/api/upload/", {
      method: "POST",
      body: formData,
    });
  },
};
