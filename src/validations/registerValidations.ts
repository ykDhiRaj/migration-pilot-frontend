export interface RegisterErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreed?: string;
}

export const validateRegister = (
  email: string,
  password: string,
  confirmPassword: string,
  agreed: boolean
): RegisterErrors => {
  const errors: RegisterErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must contain uppercase, lowercase, number and special character";
    }
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!agreed) {
    errors.agreed = "You must accept the Terms and Privacy Policy";
  }

  return errors;
};