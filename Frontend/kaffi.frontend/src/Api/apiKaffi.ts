import type { Coffee } from "../Types/Coffee";
import type { Country } from "../Types/Coutry";


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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function FetchRecCoffee(flavourIds: number[], signal: AbortSignal): Promise<Coffee | undefined> {

  const params = new URLSearchParams();
  flavourIds.forEach((id) => params.append("ids", id.toString()))

  const response = await fetch(`${BASE_URL}/Kaffi/first-match?${params}`, { signal })

  if (response.status === 204) return undefined; // ingen kaffe matchet

  if (!response.ok) {
    throw new Error(`Fetch responded with code: ${response.status}`)
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
  console.log("fra api: ", data);
  return data as Country[];
}