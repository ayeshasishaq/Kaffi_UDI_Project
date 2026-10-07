import type { Coffee } from "../Types/Coffee";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FetchRecCoffee } from "../Api/apiKaffi";
import { parseFlavourIds } from "../Utils/recParams";
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { MoveLeft, TriangleAlert } from "lucide-react"
import CoffeeBeans from "../assets/coffee-bean-bag.svg"
import "../Style/CoffeeViewStyle.css"

export function RecView() {

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [recCoffee, setRecCoffee] = useState<Coffee | null>(null);
    const [error, setError] = useState<string | null>(null);
    const flavourIds =  useMemo(() => parseFlavourIds(searchParams), [searchParams]);


    useEffect(() => {

        if (flavourIds.length === 0) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        FetchRecCoffee(flavourIds, controller.signal)
            .then(setRecCoffee)
            .catch((err) => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [flavourIds])

    if (loading) { return (
        <section className="info-container">
            <p>Laster . . .</p>
        </section>
    )}
    if (error) { return (
        <section className="info-container">
            <div className="error-banner">
                <TriangleAlert className="error-icon"/>
                <p>{error}</p>
            </div>
            <NavigationLink to="/">
                <MoveLeft />
                Tilbake
            </NavigationLink>
        </section>

    )}
    if (recCoffee === null) { return (
                <section className="info-container">
            <div className="error-banner">
                <TriangleAlert className="error-icon"/>
                <p>Ingen kaffer funnet</p>
            </div>
            <NavigationLink to="/">
                <MoveLeft />
                Tilbake
            </NavigationLink>
        </section>
    
    )}


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
                        <p>Kan kjøpes hos: Kaffebrenneriet</p>
                    </div>
                </div>
            </section>

        </>
    );
}