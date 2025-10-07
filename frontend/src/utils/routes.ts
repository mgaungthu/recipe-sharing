
export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  RECIPE: {
    LIST: "/recipe",
    CREATE: "/recipe/create",
    DETAILS: (id: string) => `/recipe/${id}`,
  },
  DASHBOARD: "/dashboard",
};