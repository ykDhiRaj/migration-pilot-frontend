export type PasswordStrength = {
  score: number;
  label: "Weak" | "Medium" | "Strong";
};

export const getPasswordStrength = (
  password: string
): PasswordStrength => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&^#()_\-+=]/.test(password)) score++;

  if (score <= 2) {
    return { score: 1, label: "Weak" };
  }

  if (score <= 4) {
    return { score: 2, label: "Medium" };
  }

  return { score: 3, label: "Strong" };
};