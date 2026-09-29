import { Btn } from "../Components/Btn/btn"
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { Lock } from 'lucide-react'
import Logo from "../assets/Logo.png" 
import "../Style/HomeView.css"

export function HomeView () {
    // hentes fra databasen men kun for test nå
    const flavours = ["Melkesjokolade", "Nøtter", "Bergamott", "Bær", "Sitrus", "Karamell", "Blomster", "Krydder", "Vanilje", "Tobakk", "Melon", "Steinfrukt", "Mørk sjokolade", "Toffee", "Havre"];
    return(
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
            {
                flavours.map((flavour) => (
                    <label className="flavour" key={flavour}>
                        <input type="checkbox" />
                        <span>{flavour}</span>
                    </label>
                ))}
        </div>
        <Btn>
            Få anbefaling
        </Btn>
        </section>
        </>
    )
}