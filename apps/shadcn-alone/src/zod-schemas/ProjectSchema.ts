import z from "zod"

export const PROJECT_STATUSES = ["draft", "active", "finished"] as const

export const ProjectSchema = z.object({
  name: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  description: z.string().transform(v => v || undefined),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
/* TODO: Leave off users for now but add it back later
  users: z
    .array(z.object({ email: z.email() }))
    .min(1)
    .max(5),
*/
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
