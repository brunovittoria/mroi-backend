import * as z from 'zod'

export const updateUserShareValidation = z.object({
    destination: z.string(),
    userId: z.number(),
})
