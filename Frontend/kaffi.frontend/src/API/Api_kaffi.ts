
export async function fetchData() {
  try {
    const response = await fetch('https://localhost:7222/Kaffi/by-flavours/?ids=1', {
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




