import type { Flavour } from "./Flavour";

export type Coffee = {
    id: number;
    name: string;
    country: { id: number; name: string; continent: { id: number; name: string } };
    variety: { id: number; name: string };
    flavours: Flavour[];
};