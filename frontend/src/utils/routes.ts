
export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  RECIPE: {
    LIST: "/recipes",
    CREATE: "/recipes",
    DETAILS: (id: string) => `/recipes/${id}`,
  },
  DASHBOARD: "/dashboard",
};