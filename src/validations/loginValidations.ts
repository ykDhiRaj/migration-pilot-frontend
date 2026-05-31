export interface LoginErrors {
  email?: string;
  password?: string;
}

export const validateLogin = (
  email: string,
  password: string
): LoginErrors => {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};