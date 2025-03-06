import { z } from 'zod';

export const ZodSchemaLogin = z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty().min(4)
})

export const ZodSchemaSignup = z.object({
    email: z.string().email(),
    password: z.string().nonempty().min(4),
    name: z.string().nonempty()
})

export const ZodSchemaComment = z.object({
    content: z.string().nonempty(),
    author: z.string().nonempty(),
    created_at: z.string().nonempty(),
    user_id: z.string().nonempty(),
    post_id: z.string().nonempty(),
})

export const ZodSchemaMail = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    description: z.string().nonempty().min(10)
})

export const ZodSchemaPost = z.object({
    title: z.string().nonempty(),
    user_id: z.string().nonempty(),
    description: z.string().nonempty(),
    image: z.string().nonempty(),
})

export const ZodSchemaPutPost = z.object({
    user_id: z.string().nonempty(),
    post_id: z.number().int(),
})
