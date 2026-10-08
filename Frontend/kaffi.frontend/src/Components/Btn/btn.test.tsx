import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Btn } from "./btn";

describe ("Btn", () => {
    it("Viser teksten og kaller onClick når den klikkes på", async () => {
        const onClick = vi.fn();
        render(<Btn onClick={onClick}>Få anbefaling</Btn>);

        await userEvent.click(screen.getByRole("button", {name: "Få anbefaling"}));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});