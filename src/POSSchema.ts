import { z } from "zod";

export const posSchema = z.object({
  shopName: z.string(),
  photoFolder: z.string(),
  photos: z.array(z.string()),
  productPhoto: z.string(),
  lowStockItem: z.string(),   // e.g. "matcha"
  salesTrend: z.string(),     // e.g. "up 40% this week"
  reorderItem: z.string(),    // e.g. "Matcha Powder — 5kg bag"
  supplierName: z.string(),   // e.g. "Pacific Coast Roasters"
  supplierPhone: z.string(),  // e.g. "+1 (555) 012-3456"
});

export type POSProps = z.infer<typeof posSchema>;
