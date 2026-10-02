import type { Coffee } from "../Types/Coffee";
import type { Country } from "../Types/Coutry";
import type { Variety } from "../Types/Variety";
import type { NewCoffee } from "../Types/NewCoffee";


const BASE_URL = "http://localhost:5054"; // Bytt ut med environent variable

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
    console.log(data.message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function FetchRecCoffee(flavourIds: number[], signal: AbortSignal) {

  const params = new URLSearchParams();
  flavourIds.forEach((id) => params.append("ids", id.toString()))

  const response = await fetch(`${BASE_URL}/Kaffi/first-match?${params}`, { signal })
  const data = await response.json();
  console.log("Kaffe fra api: ", data, Array.isArray(data));

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`)
  }

  return data as Coffee;
}

export async function FetchCountries() {

  const response = await fetch(`${BASE_URL}/Kaffi/countries`);
  const data = await response.json();
  console.log("Land fra api: ", data);

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`);
  }

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

export async function PostNewCoffee(newCoffee: NewCoffee) {
  try {
        const response = await fetch(`${BASE_URL}/Kaffi`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
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






