import '../Style/AdminViewStyle.css'
import  DropDown  from "../Components/DropDown/DropDown";
import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { Btn } from "../Components/Btn/btn";
import { MoveLeft, Trash } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { Toast, type ToastType } from "../Components/Toast/Toast";
import { FetchCountries, FetchFlavours, FetchVarities, FetchAllCoffees ,PostNewCoffee, DeleteCoffee, UpdateCoffeeName } from "../Api/apiKaffi";
import type { Flavour } from "../Types/Flavour";
import type { Country } from '../Types/Coutry';
import type { Coffee } from '../Types/Coffee';
import type { NewCoffee } from "../Types/NewCoffee";
import type { Variety } from "../Types/Variety";
import { IconBtn } from '../Components/IconBtn/IconBtn';


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
       setSelected((prev) => {
           if (prev.includes(id)) return prev.filter((x) => x !== id);
           if (prev.length >= 3) return prev;
           return [...prev, id];
       });
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
        showToast({ type: "error", message: "Fyll ut navn, land, variant og nøyaktig 3 smaker." });
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

   async function  handleDeleteCoffee(coffee: Coffee) {
    if (!coffees.includes(coffee)) {
        showToast({ type: "error", message: "Kunne ikke finne denne kaffen i databasen." });
        console.log(error)
        return;
    }

    console.log(coffee.id);

    setSaving(true);
    try {
        await DeleteCoffee(coffee);

        showToast({
        type: "info",
        message: "Kaffen ble slettet fra databasen",
        details: {
            Navn: coffee.coffeeName,
            },
        });
    
        setError("");
        setCoffeeName("");
        setSelectedCoffee(null);
        setSelected([]);
    } catch (err) {
        showToast({
            type: "error",
            message: "Kunne ikke slette kaffen fra databasen"
        });
    } finally {
        setSaving(false);
        getAllCoffees();
    }
    

}

   async function  handleUpdateCoffeeName(id: number, newName: string) {
    setSaving(true);
    try {

        const newNameObj = {
            name: newName
        }

        await UpdateCoffeeName(id, newNameObj);

        showToast({
        type: "info",
        message: "Navnet på kaffen ble endret i databasen",
        details: {
            Navn: newName,
            },
        });
    
        setError("");
        setSelectedCoffee(null);
        setSelected([]);
    } catch (err) {
        showToast({
            type: "error",
            message: "Kunne ikke endre navnet på kaffen i databasen"
        });
    } finally {
        setSaving(false);
        getAllCoffees();
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
                <div className='btn-container'>
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
                <>
                    <p>Her kan du endre navn på en kaffe</p>
                    <form className='form-container'>
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
                    </form>
                    {selectedCoffee && (
                    <>
                        <div className="coffee-container">
                            <p><strong>{selectedCoffee?.coffeeName}</strong></p>
                                <p>Smakstoner: </p>
                            <div className="flavours-container">
                                {selectedCoffee?.flavours.map((flavour) => (
                                    <p key={flavour}>{flavour}</p>
                                ))}
                            </div>
                            <p>Bønnetype: {selectedCoffee?.variety}</p>
                            <p>Opprinnelse: {selectedCoffee?.countryName}, {selectedCoffee?.continentName}</p>
                        </div>
                        <form>
                            <label className="input-container">
                                <p className="label-txt">Navn på kaffe:</p>
                                <input
                                    className="input-txt"
                                    type="text" 
                                    value={coffeeName}
                                    onChange={(e) => setCoffeeName(e.target.value)}
                                />
                            </label>      
                        </form>
                        <Btn onClick={() => handleUpdateCoffeeName(selectedCoffee.id, coffeeName)}>
                            {saving ? "Lagrer..." : "Lagre endring"}
                        </Btn>
                    </>
                    )}
                </>
                )}
                { mode === "delete" && (
                <>
                    <p>Her kan du slette en kaffe fra databasen</p>
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
                    {selectedCoffee && (
                        <div className="coffee-container">
                            <div className="header-icon">
                                <p><strong>{selectedCoffee?.coffeeName}</strong></p>
                                <IconBtn onClick={() => handleDeleteCoffee(selectedCoffee)}>
                                    <Trash/>
                                </IconBtn>
                            </div>
                                <p>Smakstoner: </p>
                            <div className="flavours-container">
                                {selectedCoffee?.flavours.map((flavour) => (
                                    <p key={flavour}>{flavour}</p>
                                ))}
                            </div>
                            <p>Bønnetype: {selectedCoffee?.variety}</p>
                            <p>Opprinnelse: {selectedCoffee?.countryName}, {selectedCoffee?.continentName}</p>
                        </div>  
                    )}
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