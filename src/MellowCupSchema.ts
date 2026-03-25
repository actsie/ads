import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const mellowCupSchema = z.object({
  shopName: z.string(),
  hook: z.string(),
  productName: z.string(),
  price: z.string(),
  tagline: z.string(),
  neighborhood: z.string(),
  accentColor: zColor(),
  productImage: z.string(),
  logoImage: z.string(),
});

export type MellowCupProps = z.infer<typeof mellowCupSchema>;

export const defaultMellowCupProps: MellowCupProps = {
  shopName: "Mellow Cup",
  hook: "Your Monday doesn't have to feel like a Monday.",
  productName: "New Matcha Latte",
  price: "1.50",
  tagline: "Specialty coffee.",
  neighborhood: "Your neighborhood.",
  accentColor: "#7bb661",
  productImage: "matcha.png",
  logoImage: "bubble1.png",
};
