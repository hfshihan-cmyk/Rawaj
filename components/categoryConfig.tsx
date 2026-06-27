import { Activity, Compass, Cpu, Milk, Package, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CategoryKey } from "@/lib/types";

/**
 * UI-only mapping of our existing data categories (lib/categories.ts) to the
 * design system's lucide icons + accent colors. The underlying data schema is
 * untouched — this only controls how each category is rendered.
 */
export const CATEGORY_UI: Record<CategoryKey, { icon: LucideIcon; color: string }> = {
  camel: { icon: Activity, color: "text-[#ffb95f]" },
  food: { icon: Milk, color: "text-[#4fdbc8]" },
  tourism: { icon: Compass, color: "text-[#4fdbc8]" },
  home: { icon: Wrench, color: "text-[#ffb95f]" },
  tech: { icon: Cpu, color: "text-[#4fdbc8]" },
  other: { icon: Package, color: "text-[#c6c6cc]" },
};
