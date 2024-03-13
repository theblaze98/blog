import { z } from 'zod'

export interface CreatePostDto {
  title: string
  content: string
  imageUrl?: string
  authorId: string
}

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
})
