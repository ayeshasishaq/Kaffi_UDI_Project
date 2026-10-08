import type { Coffee } from "../Types/Coffee";
import type { Country } from "../Types/Coutry";
import type { Variety } from "../Types/Variety";
import type { NewCoffee } from "../Types/NewCoffee";
import type { Flavour } from "../Types/Flavour";

// const BASE_URL = "http://localhost:5054/api";
// const BASE_URL = "https://ca-kaffi-backend.gentlegrass-7048958f.norwayeast.azurecontainerapps.io/api";
const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchData() {
  try {
    const response = await fetch(`https://localhost:7222`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Network response failed');

    const data = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function FetchRecCoffee(flavourIds: number[], signal: AbortSignal): Promise<Coffee | null> {

  const params = new URLSearchParams();
  flavourIds.forEach((id) => params.append("ids", id.toString()))

  const response = await fetch(`${BASE_URL}/Kaffi/recommendations?${params}`, { 
    signal,
    method: "GET",
    headers: {
    "Content-Type": "application/json",
  },
}) 

  if (response.status === 204) return null; // ingen kaffe matchet
  

  if (!response.ok) {
    throw new Error(`Det finnes ingen kaffe i databasen som passer dine smaksløker`)
  }

  const data = await response.json();
  console.log("fra api: ", data);
  return data as Coffee;
}

export async function FetchCountries() {

  const response = await fetch(`${BASE_URL}/Kaffi/countries`);

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`);
  }

  const data = await response.json();
  console.log("Land fra api: ", data);
  return data as Country[];
}

export async function FetchVarities() {

  const response = await fetch(`${BASE_URL}/Kaffi/varieties`);
  const data = await response.json();
  console.log("Bønnetyper fra api: ", data);

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`);
  }

  return data as Variety[];
}

export async function FetchFlavours() {

  const response = await fetch(`${BASE_URL}/Kaffi/flavours`);
  const data = await response.json();
  console.log("Smakstoner fra api: ", data);

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`);
  }

  return data as Flavour[];
}

export async function FetchAllCoffees() {

  const response = await fetch(`${BASE_URL}/Kaffi/all`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`);
  }

  return data as Coffee[];
}

export async function PostNewCoffee(newCoffee: NewCoffee) {
  try {
    const response = await fetch(`${BASE_URL}/Kaffi`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(newCoffee),
    });
    console.log(newCoffee);

    if (!response.ok) {
      throw new Error(`Post responded with code: ${response.status}`);

    }

    return response.json();

  } catch (error) {
    console.error('Error adding data:', error);
  }
}

export async function DeleteCoffee(coffee: Coffee) {
  const response = await fetch(`${BASE_URL}/Kaffi/${coffee.id}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type" : "application/json",
    // },
    // body: JSON.stringify(coffee),
  });
  console.log(coffee);

  if (!response.ok) {
    throw new Error(`Post responded with code: ${response.status}`);

  }
}

export async function UpdateCoffeeName(id: number, newName: object): Promise<void> {
  const response = await fetch(`${BASE_URL}/Kaffi/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newName),

  });

  if (!response.ok) {
    throw new Error(`Post responded with code: ${response.status}`);

  }
}






