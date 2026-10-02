import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Coffee } from "../Types/Coffee";
import { FetchRecCoffee } from "../Api/apiKaffi";
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { MoveLeft } from "lucide-react"
import CoffeeBeans from "../assets/coffee-bean-bag.svg"
import "../Style/CoffeeViewStyle.css"

export function RecView() {

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [recCoffee, setRecCoffee] = useState<Coffee>();
    const [error, setError] = useState<string | null>(null);

    const recKey = searchParams.getAll("ids").join(",");

    useEffect(() => {
        const coffeRecIdsList = recKey
            .split(",")
            .map(Number)
            .filter((n) => Number.isInteger(n) && n > 0);

        if (coffeRecIdsList.length === 0) {

            setLoading(false);
            return;

        }

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        FetchRecCoffee(coffeRecIdsList, controller.signal)
            .then(setRecCoffee)
            .catch((err) => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [recKey])

    if (loading) { return (<p>Laster . . .</p>) }
    if (error) { return (<p>Noe gikk galt: {error}</p>) }
    if (recCoffee === undefined) { return (<p>Ingen kaffer funnet</p>) }


    return (
        <>
            <section className="coffee-content">
                <div className="nvgt-container">
                    <NavigationLink to="/">
                        <MoveLeft />
                        Tilbake
                    </NavigationLink>
                </div>
                <img src={CoffeeBeans} alt="Bag of coffee beans" className="coffee-beans" />
                <h2>Dagens anbefaling:</h2>
                <div className="coffee-card">
                    <p><strong>{recCoffee?.coffeeName}</strong></p>
                    <div className="attributes-container">
                        <div className="flavours-container">
                            <p>Smakstoner: </p>
                            {recCoffee.flavours.map((flavour) => (
                                <p key={flavour}>{flavour}</p>
                            ))}
                        </div>
                        <p>Bønnetype: {recCoffee?.variety}</p>
                        <p>Land: {recCoffee?.countryName}</p>
                        <p>Kontinent: {recCoffee?.continentName}</p>
                    </div>
                </div>
            </section>

        </>
    );
}