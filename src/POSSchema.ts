import { z } from "zod";

export const posSchema = z.object({
  shopName: z.string(),
  photoFolder: z.string(),
  photos: z.array(z.string()),
  productPhoto: z.string(),
  lowStockItem: z.string(),   // e.g. "matcha"
  salesTrend: z.string(),     // e.g. "up 40% this week"
  reorderItem: z.string(),    // e.g. "Matcha Powder — 5kg bag"
});

export type POSProps = z.infer<typeof posSchema>;
