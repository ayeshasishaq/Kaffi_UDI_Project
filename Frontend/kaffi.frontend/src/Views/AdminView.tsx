import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import  DropDown  from "../Components/DropDown/DropDown";
import { MoveLeft } from "lucide-react"
import '../Style/AdminViewStyle.css'
import { useState } from "react";
import { flavours, countries} from "../Data/TestData";
import type { Country } from '../Types/Coutry';

export function AdminView () {
    const [selected, setSelected] = useState<number[]>([]);
    //const [noMatch, setNoMatch] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);



        function toggleFlavour(id: number) {
        //setNoMatch(false);
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    return(
        <>
                <section className="content">
                    <div className="nvgt-container">
                        <NavigationLink to="/">
                            <MoveLeft />
                            Tilbake
                        </NavigationLink>
                    </div>
                    <div className="header-container">
                        <p className="logo-txt">Kaffi</p>
                        <h1 className="admin-header">Admin</h1>
                    </div>
                    <div className="text-container">
                        <p>Her kan du legge til nye kaffer! Fyll ut informasjon om kaffen, hvor den kommer fra og hvilke smaker den har.</p>
                        <DropDown items={countries} onSelect={setSelectedCountry} />
                        <p>{selectedCountry?.name}</p>
                        <p>{selectedCountry?.continent.name}</p>
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
                </section>
        </>
    )
}