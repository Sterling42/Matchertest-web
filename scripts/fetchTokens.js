require('dotenv').config({ path: '../.env.local' });
const fetch = require('node-fetch');
const fs = require('fs');
const { MongoClient } = require('mongodb');

// URL of the API
const apiUrl = 'https://tokens.jup.ag/tokens/tradable';

// MongoDB Atlas connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to fetch data and save to JSON file
async function fetchAndSaveData() {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Write data to a JSON file
        fs.writeFileSync('tokens.json', JSON.stringify(data, null, 2));
        console.log('Data has been written to tokens.json');

        // Store data in MongoDB Atlas
        await storeTokens(data);
    } catch (error) {
        console.error('Error fetching or uploading data:', error);
    }
}

// Function to store tokens in MongoDB Atlas
async function storeTokens(data) {
    try {
        await client.connect();
        const database = client.db('alltokens');
        const collection = database.collection('tokenlist');

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

// Call the function
fetchAndSaveData();