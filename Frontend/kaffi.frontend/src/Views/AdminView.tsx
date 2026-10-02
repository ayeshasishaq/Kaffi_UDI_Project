import '../Style/AdminViewStyle.css'
import  DropDown  from "../Components/DropDown/DropDown";
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { Btn } from "../Components/Btn/btn";
import { MoveLeft } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { Toast, type ToastType } from "../Components/Toast/Toast";
import { FetchCountries, FetchFlavours, FetchVarities, FetchAllCoffees ,PostNewCoffee } from "../Api/apiKaffi";
import type { Flavour } from "../Types/Flavour";
import type { Country } from '../Types/Coutry';
import type { Coffee } from '../Types/Coffee';
import type { NewCoffee } from "../Types/NewCoffee";
import type { Variety } from "../Types/Variety";


export function AdminView () {
    const [toast, setToast] = useState<ToastData | null>(null);
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedVariety, setSelectedVariety] = useState<Variety | null>(null);
    const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
    const [varieties, setVarieties] = useState<Variety[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [flavours, setFlavours] = useState<Flavour[]>([]);
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    const [coffeeName, setCoffeeName] = useState("");
    const [error, setError] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [saving, setSaving] = useState(false);;
    const [mode, setMode] = useState<Mode>("add");
    const closeToast = useCallback(() => setToastVisible(false), []);

    type Mode = "add" | "edit" | "delete";
    

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

    const getVarieties = async () => {
        const result = await FetchVarities();
        setVarieties(result);
        
    }

    const getFlavours = async () => {
        const result = await FetchFlavours();
        setFlavours(result);
    }

    const getAllCoffees = async () => {
        const result = await FetchAllCoffees();
        setCoffees(result);
    }

   async function  handleAddCoffee() {
    if (!coffeeName.trim() || !selectedCountry || !selectedVariety || selected.length === 0) {
        showToast({ type: "error", message: "Fyll ut navn, land, variant og minst én smak." });
        console.log(error)
        return;
    }

    const newCoffee: NewCoffee = {
        Name: coffeeName.trim(),
        CountryId: selectedCountry.id,
        VarietyId: selectedVariety.id,
        FlavourIds: selected,
    };

    setSaving(true);
    try {
        await PostNewCoffee(newCoffee);

        showToast({
        type: "info",
        message: "Kaffe lagt til",
        details: {
            Navn: newCoffee.Name,
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
    } catch (err) {
        showToast({
            type: "error",
            message: "Kunne ikke lagre kaffen i databasen"
        });
    } finally {
        setSaving(false);
    }
    

}

    useEffect(() => {
        getCountries();
        getVarieties();    
        getFlavours();
        getAllCoffees();  
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
                <div>
                    <Btn onClick={ () => setMode("add")}> Legg til </Btn>
                    <Btn onClick={ () => setMode("edit")}> Endre </Btn>
                    <Btn onClick={ () => setMode("delete")}> Slett</Btn>
                </div>
                { mode === "add" && (
                    <>
                        <div className="text-container">
                            <p>Her kan du legge til nye kaffer! Fyll ut informasjon om kaffen, hvor den kommer fra og hvilke smaker den har.</p>
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
                                getLabel={(v) => v.name}
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
                        <Btn onClick={handleAddCoffee}>
                            {saving ? "Lagrer..." : "Legg til kaffe i databasen"}
                        </Btn>
                    </>
                )}
                { mode === "edit" && (
                    <p>Her kommer skjema for å redigere en kaffe</p>
                )}
                { mode === "delete" && (
                <>
                    <p>Her kommer skjema for å slette en kaffe</p>
                    <div className="input-container">
                        <p className="label-txt">Alle kaffer i databasen:</p>
                        <DropDown 
                            items={coffees} 
                            selected={selectedCoffee}
                            placeholder="Velg kaffe"
                            onSelect={setSelectedCoffee}
                            getLabel={(c) => `${c.coffeeName}, ${c.continentName}` }
                        />        
                    </div>   
                </>
                )}
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