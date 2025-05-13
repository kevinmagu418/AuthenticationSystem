export interface PasswordRule {
    name: string;
    test: (password: string) => boolean;
  }


export const passwordRules: PasswordRule[] = [
    {
      name: "At least 8 characters",
      test: (pw) => pw.length >= 8,
    },
    {
      name: "At least one uppercase letter",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      name: "At least one lowercase letter",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      name: "At least one number",
      test: (pw) => /\d/.test(pw),
    },
    {
      name: "At least one special character",
      test: (pw) => /[!@#$%^&*]/.test(pw),
    },
  ];