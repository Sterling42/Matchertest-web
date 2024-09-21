import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const database = client.db('temptokens');
    const collection = database.collection('tokens');
    const tokens = await collection.find().toArray();
    if (tokens.length === 0) {
      res.status(404).json({ error: 'No tokens found' });
      return;
    }
    const randomIndex = Math.floor(Math.random() * tokens.length);
    const randomToken = tokens[randomIndex];
    res.status(200).json(randomToken);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}