import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'index.md',
      schema: z.object({
        title: z.string(),
        intro: z.string().optional(),
      }),
    }),

    about: defineCollection({
      type: 'page',
      source: 'about.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
      }),
    }),

    timeline: defineCollection({
      type: 'data',
      source: 'timeline.yml',
      schema: z.object({
        title: z.string(),
        items: z.array(
          z.object({
            year: z.union([z.string(), z.number()]),
            title: z.string(),
            place: z.string().optional(),
            icon: z.string().optional(),
          })
        ),
      }),
    }),

    services: defineCollection({
      type: 'page',
      source: 'mes-services/**.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),

        type: z.enum(['landing', 'service']).optional(),

        slug: z.string().optional(),
        accent: z.enum(['rose', 'olive', 'ink']).optional(),
        cta: z.string().optional(),

      }),
    }),

    contact: defineCollection({
      type: 'data',
      source: 'contact.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        email: z.string().email().optional(),
        linkedin: z.string().url().optional(),
      }),
    }),
  },
})