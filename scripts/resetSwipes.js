// scripts/resetSwipes.js
require('dotenv').config({ path: '../.env.local' });
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

async function resetSwipes() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('udb'); // Replace with your database name
    const users = database.collection('users'); // Replace with your collection name

    const result = await users.updateMany(
      {},
      {
        $set: { swipes: 10 },
      }
    );

    console.log(`Swipes reset for ${result.modifiedCount} users`);
  } finally {
    await client.close();
  }
}

resetSwipes().catch(console.error);