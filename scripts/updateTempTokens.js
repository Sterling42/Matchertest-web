require('dotenv').config({ path: '../.env.local' });
const fs = require('fs');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function storeTokens() {
    try {
        // Read the JSON file
        const data = fs.readFileSync('topTokens.json', 'utf8');
        const jsonData = JSON.parse(data);

        await client.connect();
        const database = client.db('temptokens');
        const collection = database.collection('tokens');

        const result = await collection.insertMany(jsonData);
        console.log(`${result.insertedCount} documents were inserted`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

storeTokens();