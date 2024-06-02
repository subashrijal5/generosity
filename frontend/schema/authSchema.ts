import { object, ref, string } from "yup";
import type { InferType } from "yup";

export const signUpFormSchema = object({
  name: string().required().label("Name").min(3).max(50),
  email: string().email().required().label("Email"),
  password: string().required().label("Password").min(8),
  confirm_password: string().oneOf([ref("password"), ""], "Passwords must match"),
});

export type TSignupForm = InferType<typeof signUpFormSchema>;

export const LoginSchema = object({
  email: string()
    .email()
    .required()
    .label("Email")
    .matches(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim, {
      message: "Invalid email address",
    }),
  password: string().required().label("Password").min(8),
});

export type TLoginForm = InferType<typeof LoginSchema>;

export type TUser = TSignupForm & {
  id: number;
  refreshToken: string;
  token: string;
  tokenExpiration: string;
  maxAge: number;
  createdAt: string;
  updatedAt: string;
};


export const changePasswordSchema = object({
  oldPassword: string().required().label("Old Password").min(8),
  newPassword: string().required().label("New Password").min(8),
  confirmPassword: string().required("Confirm password is required").oneOf([ref("newPassword"), ""], "Passwords must match"),
});

export type TChangePasswordForm = InferType<typeof changePasswordSchema>;
