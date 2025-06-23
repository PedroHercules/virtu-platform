"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function invalidate(path: string) {
  revalidatePath(path);
  revalidateTag(path);
  return { success: true, revalidated: true, path };
}
