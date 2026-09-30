export const flavours = [
  { id: 1, name: "Melkesjokolade" },
  { id: 2, name: "Nøtter" },
  { id: 3, name: "Bergamott" },
  { id: 4, name: "Bær" },
  { id: 5, name: "Sitrus" },
  { id: 6, name: "Karamell" },
  { id: 7, name: "Blomster" },
  { id: 8, name: "Krydder" },
  { id: 9, name: "Vanilje" },
  { id: 10, name: "Tobakk" },
  { id: 11, name: "Melon" },
  { id: 12, name: "Steinfrukt" },
  { id: 13, name: "Mørk sjokolade" },
  { id: 14, name: "Toffee" },
  { id: 15, name: "Havre" },
];

export const coffees = [
  {
    id: 1,
    name: "Yirgacheffe",
    country: { id: 1, name: "Etiopia", continent: { id: 1, name: "Afrika" } },
    variety: { id: 1, name: "Heirloom" },
    flavours: [
      { id: 3, name: "Bergamott" },
      { id: 7, name: "Blomster" },
      { id: 5, name: "Sitrus" },
    ],
  },
  {
    id: 2,
    name: "Cerrado",
    country: { id: 2, name: "Brasil", continent: { id: 2, name: "Sør-Amerika" } },
    variety: { id: 2, name: "Bourbon" },
    flavours: [
      { id: 1, name: "Melkesjokolade" },
      { id: 6, name: "Karamell" },
      { id: 2, name: "Nøtter" },
    ],
  },
];

export const countries = [
    {
        id: 1,
        name: "Etiopia",
        continent: { id: 1, name: "Afrika" },
    },
        {
        id: 2,
        name: "Brasil",
        continent: { id: 1, name: "Sør-Amerika" },
    },
      {
        id: 3,
        name: "Colombia",
        continent: { id: 2, name: "Sør-Amerika" },
    },
        {
        id: 4,
        name: "Panama",
        continent: { id: 3, name: "Mellom-Amerika" },
    },
         {
        id: 5,
        name: "Indonesia",
        continent: { id: 4, name: "Mellom-Amerika" },
    },


]

type Flavour = { id: number; name: string };

type Coffee = {
    id: number;
    name: string;
    country: { id: number; name: string; continent: { id: number; name: string } };
    variety: { id: number; name: string };
    flavours: Flavour[];
};

    export function findMatchingCoffee(selectedIds: number[], coffees: Coffee[]) {
        return coffees.find(
        (coffee) =>
        coffee.flavours.filter((f) => selectedIds.includes(f.id)).length >= 2
        );
    }