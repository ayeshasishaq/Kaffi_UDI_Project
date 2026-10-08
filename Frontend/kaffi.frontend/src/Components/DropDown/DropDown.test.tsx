import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import  DropDown  from "./DropDown";

type Country = {
    id: number,
    name: string,
    continent: string,
}

const countries: Country[] = [
    {id: 1, name: "Etiopia", continent: "Afrika"},
    {id: 2, name: "Colombia", continent: "Sør-Amerika"},
    {id: 3, name: "Indonesia", continent: "Asia"}
]

const setLabel = (c: Country) => `${c.name}, ${c.continent}`;

describe ("DropDown", () => {
    it("Viser placeholder når ingenting er valgt", async () => {
        render(<DropDown
        items={countries}
        selected={null}
        placeholder="Velg land"
        onSelect={vi.fn()}
        getLabel={setLabel}
        />
        );

        expect(screen.getByRole("button", {name: "Velg land"})).toBeInTheDocument();
    });
});

describe ("DropDown", () => {
    it("Viser teksten til valgt element på knappen", async () => {
        render(<DropDown
        items={countries}
        selected={countries[0]}
        placeholder="Velg land"
        onSelect={vi.fn()}
        getLabel={setLabel}
        />
        );

        expect(screen.getByRole("button", {name: "Etiopia, Afrika"})).toBeInTheDocument();
    });
});

describe ("DropDown", () => {
    it("Viser alle alternativene når menyen åpnes", async () => {
        render(<DropDown
        items={countries}
        selected={null}
        placeholder="Velg land"
        onSelect={vi.fn()}
        getLabel={setLabel}
        />
        );

        await userEvent.click(screen.getByRole("button", {name: "Velg land"}));

        expect(screen.getByText("Etiopia, Afrika")).toBeInTheDocument();
        expect(screen.getByText("Colombia, Sør-Amerika")).toBeInTheDocument();
        expect(screen.getByText("Indonesia, Asia")).toBeInTheDocument();
    });
});

describe ("DropDown", () => {
    it("Kaller onSelect når et land er valgt", async () => {
        const onSelect=vi.fn();
        render(<DropDown
        items={countries}
        selected={null}
        placeholder="Velg land"
        onSelect={onSelect}
        getLabel={setLabel}
        />
        );

        await userEvent.click(screen.getByRole("button", {name: "Velg land"}));
        await userEvent.click(screen.getByText("Colombia, Sør-Amerika"));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(countries[1]);
    });
});