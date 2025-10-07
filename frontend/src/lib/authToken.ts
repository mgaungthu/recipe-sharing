// frontend/src/lib/authToken.ts
let token: string | null = null;

export const setAuthToken = (value: string | null) => {
  token = value;
};

export const getAuthToken = () => token;