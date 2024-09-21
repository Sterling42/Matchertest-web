const fetch = require('node-fetch');
const fs = require('fs');

// URL of the API
const apiUrl = 'https://tokens.jup.ag/tokens/tradable';

// Function to fetch data and save to JSON file
async function fetchAndSaveData() {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Write data to a JSON file
        fs.writeFileSync('tokens.json', JSON.stringify(data, null, 2));
        console.log('Data has been written to tokens.json');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function
fetchAndSaveData();