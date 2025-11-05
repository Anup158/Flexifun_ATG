const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5173/api";

export interface ApiError {
  error: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("auth_token");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  private getHeaders() {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API request failed");
    }

    return response.json();
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // Auth endpoints
  studentLogin(pinCode: string) {
    return this.post("/auth/student/login", { pinCode });
  }

  studentSignup(name: string, avatar: string, pinCode: string) {
    return this.post("/auth/student/signup", { name, avatar, pinCode });
  }

  therapistLogin(email: string, password: string) {
    return this.post("/auth/therapist/login", { email, password });
  }

  therapistSignup(name: string, email: string, password: string, organization?: string) {
    return this.post("/auth/therapist/signup", {
      name,
      email,
      password,
      organization,
    });
  }

  // Student endpoints
  getStudentProfile() {
    return this.get("/student/profile");
  }

  updateStudentProfile(data: any) {
    return this.put("/student/profile", data);
  }

  getStudentProgress() {
    return this.get("/student/progress");
  }

  updateGameProgress(moduleId: string, data: any) {
    return this.put("/student/progress", {
      moduleId,
      ...data,
    });
  }

  getStudentStats() {
    return this.get("/student/stats");
  }

  // Therapist endpoints
  getTherapistDashboard() {
    return this.get("/therapist/dashboard");
  }

  getStudentProgressByTherapist(studentId: string) {
    return this.get(`/therapist/student/${studentId}/progress`);
  }

  generateWeeklyReport(studentId: string) {
    return this.get(`/therapist/student/${studentId}/report`);
  }

  assignStudent(studentId: string) {
    return this.post("/therapist/assign-student", { studentId });
  }
}

export const apiClient = new ApiClient();
