import { useParams } from "react-router-dom";
import { coffees } from "../Data/TestData";
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { MoveLeft } from "lucide-react"
import CoffeeBeans  from "../assets/coffee-bean-bag.svg"
import "../Style/CoffeeViewStyle.css"

export function CoffeeView() {
    const { id } = useParams();
    const coffee = coffees.find((c) => c.id === Number(id));

    if (!coffee) return <p>Fant ikke kaffen.</p>;

    return (
        <> 
        <section className="coffee-content">
            <div className="nvgt-container">
                <NavigationLink to="/">
                    <MoveLeft />
                    Tilbake
                </NavigationLink>
            </div>
            <img src={CoffeeBeans} alt="Bag of coffee beans" className="coffee-beans"/>
            <h2>Dagens anbefaling:</h2>
            <div className="coffee-card">
                <p><strong>{coffee?.name}</strong></p>
                <div className="attributes-container">
                    <div className="flavours-container">
                        <p>Smakstoner: </p>
                        {coffee.flavours.map((flavour) => (
                            <p key={flavour.id}>{flavour.name}</p>
                        ))}
                    </div>
                    <p>Bønnetype: {coffee?.variety.name}</p>
                    <p>Land: {coffee?.country.name}</p>
                    <p>Kontinent: {coffee?.country.continent.name}</p>
                </div>
            </div>
        </section>
    
        </>
    )

   
}