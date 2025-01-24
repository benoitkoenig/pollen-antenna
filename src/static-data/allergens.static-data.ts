export const allergensStaticData = [
  "ragweed",
  "mugwort",
  "alder",
  "birch",
  "hornbeam",
  "chestnut",
  "oak",
  "cypress",
  "ash",
  "grasses",
  "hazel",
  "olive",
  "sorrel",
  "poplar",
  "plantain",
  "plane tree",
  "willow",
  "linden",
  "nettle",
] as const;

export type Allergen = (typeof allergensStaticData)[number];
