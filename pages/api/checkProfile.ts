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
  const { wallet } = req.query;

  try {
    const client = await clientPromise;
    const database = client.db('yourDatabaseName');
    const collection = database.collection('profiles');
    const profile = await collection.findOne({ wallet });

    res.status(200).json({ exists: !!profile });
  } catch (error) {
    console.error('Error checking profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}