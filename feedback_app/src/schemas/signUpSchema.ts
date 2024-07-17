import {z} from "zod";

export const usernameValidation = z.string()
.min(2,"Username must be at least 2 characters long")
.max(20,"Username must be no more than 20 characters long")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")

export const signUpSchema = z.object({
   username: usernameValidation,
   email:z.string().email({message:"Invalid email address"}),
   password:z.string().min(6,{message:"password must be at least 6 characters"})
})