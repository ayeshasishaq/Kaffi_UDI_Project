import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import  DropDown  from "../Components/DropDown/DropDown";
import { Btn } from "../Components/Btn/btn";
import { MoveLeft } from "lucide-react"
import '../Style/AdminViewStyle.css'
import { useState, useCallback, useEffect } from "react";
import { flavours, varieties} from "../Data/TestData";
import type { Country } from '../Types/Coutry';
import type { NewCoffee } from "../Types/NewCoffee";
import type { Variety } from "../Types/Variety";
import { Toast, type ToastType } from "../Components/Toast/Toast";
import { FetchCountries } from "../Api/apiKaffi";


export function AdminView () {
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [coffeeName, setCoffeeName] = useState("");
    const [error, setError] = useState("");
    const [selectedVariety, setSelectedVariety] = useState<Variety | null>(null);
    const [toast, setToast] = useState<ToastData | null>(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const closeToast = useCallback(() => setToastVisible(false), []);
    



    type ToastData = {
        type: ToastType;
        message: string;
        details?: Record<string, string>;
    };



    function showToast(data: ToastData) {
        setToast(data);
        setToastVisible(true);
    }


    function toggleFlavour(id: number) {
        //setNoMatch(false);
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    const getCountries = async () => {
        const result =  await FetchCountries();
        setCountries(result);
    }

    
   function handleAddCoffee() {
    if (!coffeeName.trim() || !selectedCountry || !selectedVariety || selected.length === 0) {
        setError("Fyll ut navn, land, variant og minst én smak.");
        showToast({ type: "error", message: "Fyll ut navn, land, variant og minst én smak." });
        console.log(error)
        return;
    }

    const newCoffee: NewCoffee = {
        name: coffeeName.trim(),
        countryId: selectedCountry.id,
        varietyId: selectedVariety.id,
        flavourIds: selected,
    };

    console.log("Ny kaffe:", newCoffee);
    // Senere: await fetch("/api/coffee", { method: "POST", ... })

    showToast({
    type: "info",
    message: "Kaffe lagt til",
    details: {
        Navn: newCoffee.name,
        Land: `${selectedCountry.name}, ${selectedCountry.continent}`,
        Variant: selectedVariety.name,
        Smaker: flavours
                .filter((f) => selected.includes(f.id))
                .map((f) => f.name)
                .join(", "),
        },
    });

    setError("");
    setCoffeeName("");
    setSelectedCountry(null);
    setSelectedVariety(null);
    setSelected([]);
}

    useEffect(() => {
        getCountries();
        
    }, []);

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
                        <div className="dropdown-container">
                            
                        </div>
                    </div>
                    <form className="form-container">
                    <label className="input-container">
                    <p className="label-txt">Navn på kaffe:</p>
                    <input
                    className="input-txt"
                    type="text" 
                    value={coffeeName}
                    onChange={(e) => setCoffeeName(e.target.value)}
                    />
                    </label>
                    <div className="input-container">
                        <p className="label-txt">Land:</p>
                        <DropDown 
                        items={countries} 
                        selected={selectedCountry}
                        placeholder="Velg land"
                        onSelect={setSelectedCountry} 
                        getLabel={(c) => `${c.name}, ${c.continent}` }
                        />
                    </div>
                    
                    <div className="input-container">
                        <p className="label-txt">Bønnetype:</p>
                        <DropDown 
                        items={varieties} 
                        selected={selectedVariety}
                        placeholder="Velg bønnetype"
                        onSelect={setSelectedVariety} 
                        />
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
                    </form>
                     <Btn onClick={handleAddCoffee}>Legg til kaffe i databasen</Btn>
                     {toast && (
                        <Toast
                            type={toast.type}
                            message={toast.message}
                            details={toast.details}
                            visible={toastVisible}
                            onClose={closeToast}
                        />
                    )}
                </section>
        </>
    )
}