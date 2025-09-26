export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidUsername = (username) =>
  typeof username === "string" && username.length >= 3;
