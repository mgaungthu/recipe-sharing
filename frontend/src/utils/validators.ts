/** Validate email format */
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Check if email is valid */
export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

/** Check if password meets strength requirement */
export const isStrongPassword = (password: string): boolean => {
  // Must be at least 8 chars, include uppercase, lowercase, number, and special char
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-+=~`]{8,}$/;
  return strongRegex.test(password.trim());
};

/** Generic required field checker */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Checks if two passwords match.
 * @param password - The original password string.
 * @param confirmPassword - The confirmation password string.
 * @returns True if passwords match, false otherwise.
 */
export const isMatchingPasswords = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Checks if a username is valid (at least 3 characters, only letters, numbers, underscores, or periods).
 * @param username - The username string to validate.
 * @returns True if username is valid, false otherwise.
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[A-Za-z0-9_.]{3,}$/;
  return usernameRegex.test(username);
};