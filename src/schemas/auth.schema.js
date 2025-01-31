import {z} from 'zod';

export const registerSchema = z.object({
username: z.string({
    required_error:"username is required"
}),
email: z.string({
    required_error:'email is required'
})
.email({
    message:"invalid email",
}),
password: z.string({
    required_error:"Password is required",
})
.min(6,{
    message:"Password must be at least 6 characters"
}),
})

export const loginSchema = z.object({
    email: z.string({
        required_error:"Email is required",
    })
    .email({
        message:"Ivalid email",
    }),
    password: z.string({
        required_error:"Password is required",
    })
    .min(6, {
        message:"Password must be at least 6 characters"
    })
})