import { Btn } from "../Components/Btn/btn"
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { Lock } from 'lucide-react'
import Logo from "../assets/Logo.png" 
import "../Style/HomeViewStyle.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flavours, coffees, findMatchingCoffee } from "../Data/TestData";

export function HomeView() {
    const [selected, setSelected] = useState<number[]>([]);
    const [noMatch, setNoMatch] = useState(false);
    const navigate = useNavigate();


    function toggleFlavour(id: number) {
        setNoMatch(false);
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    function handleRecommend() {
        const match = findMatchingCoffee(selected, coffees);
        if (match) {
            navigate(`/coffee/${match.id}`);
        } else {
            setNoMatch(true);
        }
    }

    return (
        <>
        <section className="content">
            <div className="nvgt-container">
                <NavigationLink to="/admin">
                <Lock />
                    Admin
                </NavigationLink>
            </div>
        <img src={Logo} alt="Logo" className="logo"/>
        <div className="text-container">
        <h2>Oppdag kaffen som passer deg</h2>
        <p>Alle har forskjellig smak. Kryss av for det du liker, og få en personlig kaffeanbefaling basert på dine preferanser.</p>
        </div>
            <div className="flavour-grid">
                {flavours.map((flavour) => (
                    <label className="flavour" key={flavour.id}>
                        <input
                            type="checkbox"
                            checked={selected.includes(flavour.id)}
                            onChange={() => toggleFlavour(flavour.id)}
                        />
                        <p>{flavour.name}</p>
                    </label>
                ))}
            </div>

            {noMatch && <p>Fant ingen kaffe som matcher. Prøv å velge flere smaker.</p>}
            <Btn onClick={handleRecommend}>Få anbefaling</Btn>
        </section>
        </>
    )
}