import { z } from "zod";

export const AuthSchema = z.object({
    email: z.string().min(1,"Please Enter Email"),
    password: z.string().min(6, { message: "Please Enter the password" }),
    remember_me: z.boolean().default(true).optional()
  });