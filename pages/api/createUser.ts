// pages/api/createUser.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
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
  const { wallet } = req.body;
  if (!wallet) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }
  try {
    const client = await clientPromise;
    const database = client.db('udb'); // Replace with your database name
    const collection = database.collection<User>('users'); // Replace with your collection name
    let user = await collection.findOne({ wallet });
    if (!user) {
      const newUser: Omit<User, '_id'> = { wallet, username: '', pp: false, ts: false, swipes: 10 };
      await collection.insertOne(newUser);
      user = await collection.findOne({ wallet });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}