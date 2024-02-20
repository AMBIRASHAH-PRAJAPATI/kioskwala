const { z } = require("zod");

// Creating Object Schema
const loginSchema = z.object({
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least of lenght 10" })
    .max(20, { message: "Phone number must not be more length 20" }),
  password: z
  .string({ required_error: "Password is required" })
  .trim()
  .min(7, { message: "Password must be at least of lenght 7" })
  .max(1024, { message: "Password must not be more length 1024" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is require" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: " Email is requires" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .refine(data => data.confirmPassword === data.password, { message: "Passwords do not match" }),
});

module.exports = {signupSchema, loginSchema};