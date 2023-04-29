import { z } from "zod";

//public
export const userSignUpValidator = z.object({
  body: z.object({
    email: z.string({required_error: "email is required",}).email({ message: 'Must be a valid email' }),
    password: z.string({ required_error: "password is required", }),
    name: z.string({required_error:"name is required"})
  }),
});

export const userLogInValidator = z.object({
  body: z.object({
    emailId: z.string({required_error: "email is required",}).email({ message: 'Must be a valid email' }),
    password: z.string({ required_error: "password is required", }),
  })
})


export const verifyEmailValidator = z.object({
  params: z.object({
    token: z.string()
  })
})
