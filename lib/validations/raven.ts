import * as z from 'zod';

export const RavenValidation = z.object({
    raven: z.string().min(3, { message: 
    'minimum 3 characters'}),
    accountId: z.string(),
});

export const CommentValidation = z.object({
    raven: z.string().min(3, { message: 
    'minimum 3 characters'}),
});