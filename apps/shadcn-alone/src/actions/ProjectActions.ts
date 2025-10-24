"use server";

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import { ProjectSchema, type ProjectSchemaType } from "@/zod-schemas/ProjectSchema";

// Public Objects ------------------------------------------------------------

export async function createProject(unsafeData: ProjectSchemaType): Promise<{success: boolean}>
{
  const data = ProjectSchema.safeParse(unsafeData);
  if (!data.success) {
    return { success: false };
  }
  // TODO - Save to DB
  return { success: true };
}

