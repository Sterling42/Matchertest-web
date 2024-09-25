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
  if (req.method === 'POST') {
    const { mintAddresses } = req.body;
    if (!mintAddresses || !Array.isArray(mintAddresses)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    try {
      const client = await clientPromise;
      const database = client.db('alltokens'); // Replace with your database name
      const collection = database.collection('tokenlist'); // Replace with your collection name

      const tokens = await collection.find(
        { address: { $in: mintAddresses } },
        { projection: { address: 1, logoURI: 1, symbol: 1 } }
      ).toArray();

      res.status(200).json(tokens);
    } catch (error) {
      console.error('Error fetching token data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}