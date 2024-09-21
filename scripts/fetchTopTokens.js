const fetch = require('node-fetch');
const fs = require('fs');

async function fetchAndSaveTokens() {
    const url = 'https://tokens.jup.ag/tokens?tags=birdeye-trending';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        fs.writeFile('topTokens.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Data successfully saved to tokens.json');
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndSaveTokens();