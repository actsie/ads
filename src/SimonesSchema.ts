import { z } from "zod";

export const simonesSchema = z.object({
  shopName: z.string(),
  photoFolder: z.string(),
  photos: z.array(z.string()),
  productPhoto: z.string(),
  suggestedSpecial: z.string(),
  draftPostCaption: z.string(),
});

export type SimonesProps = z.infer<typeof simonesSchema>;
