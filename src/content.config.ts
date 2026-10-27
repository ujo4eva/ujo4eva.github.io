import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const mixes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mixes' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    date: z.date(),
    order: z.number().int().positive(),
    embedUrl: z.string().url(),
    genre: z.string().optional(),
    description: z.string().optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    videoUrl: z.string().url(),
    role: z.enum(['edited', 'graded', 'edited & graded']),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    repo: z.string().url(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, mixes, videos, projects };