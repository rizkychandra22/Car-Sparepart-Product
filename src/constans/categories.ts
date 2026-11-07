import type { ProductCategory } from "@/types/product"

export interface CategoryInfo {
  name: ProductCategory
  slug: string
  description: string
  iconName: string
  itemCount: number
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "Mesin",
    slug: "mesin",
    description: "Piston, gasket, timing belt, camshaft & komponen ruang bakar",
    iconName: "Wrench",
    itemCount: 42,
  },
  {
    name: "Pengereman",
    slug: "pengereman",
    description: "Kampas rem ceramic, cakram disc brake, minyak rem & kaliper",
    iconName: "Disc",
    itemCount: 35,
  },
  {
    name: "Kelistrikan",
    slug: "kelistrikan",
    description: "Busi iridium, aki mobil, alternator, koil & sensor-sensor mesin",
    iconName: "Zap",
    itemCount: 28,
  },
  {
    name: "Suspensi",
    slug: "suspensi",
    description: "Shockbreaker gas, per spiral, link stabilizer & ball joint",
    iconName: "Activity",
    itemCount: 19,
  },
  {
    name: "Filter & Oli",
    slug: "filter-oli",
    description: "Filter oli high-flow, filter udara cabin & oli sintetik 0W-20/5W-30",
    iconName: "Droplet",
    itemCount: 50,
  },
  {
    name: "Transmisi",
    slug: "transmisi",
    description: "Kampas kopling, dekrup cover, oli matic ATF & kabel kopling",
    iconName: "Cog",
    itemCount: 16,
  },
]

