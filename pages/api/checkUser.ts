// pages/api/checkUser.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from './interface/user';

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
  if (!wallet) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }
  try {
    const client = await clientPromise;
    const database = client.db('udb'); // Replace with your database name
    const collection = database.collection<User>('users'); // Replace with your collection name
    const user = await collection.findOne({ wallet });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}