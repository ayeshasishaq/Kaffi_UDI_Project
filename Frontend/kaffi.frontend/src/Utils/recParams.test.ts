import { buildRecPath, parseFlavourIds } from "./recParams";

describe("buildRecPath", () => {
    it("lager en query-parameter per smak", () => {
        expect(buildRecPath([3, 5])).toBe("/rec?ids=3&ids=5");
    });

    it("håndterer én smak", () => {
        expect(buildRecPath([7])).toBe("/rec?ids=7");
    });

    it("gir tom query string når ingen smaker er valgt", () => {
        expect(buildRecPath([])).toBe("/rec?");
    });
});

describe("parseFlavourIds", () => {
    it("leser alle ids fra URL-en som tall", () => {
        const params = new URLSearchParams("ids=3&ids=5");
        expect(parseFlavourIds(params)).toEqual([3, 5]);
    });

    it("gir tom liste når ids mangler", () => {
        expect(parseFlavourIds(new URLSearchParams(""))).toEqual([]);
    });

    it("fjerner ugyldige verdier", () => {
        const params = new URLSearchParams("ids=3&ids=abc&ids=-1&ids=0&ids=2.5");
        expect(parseFlavourIds(params)).toEqual([3]);
    });

    it("er motsatt av buildRecPath", () => {
        const path = buildRecPath([1, 4, 9]);
        const params = new URLSearchParams(path.split("?")[1]);
        expect(parseFlavourIds(params)).toEqual([1, 4, 9]);
    });
});