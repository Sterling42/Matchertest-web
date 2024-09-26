// pages/api/getUserData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from './interface/user';

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env.local file
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { wallet } = req.query;

    try {
      const client = await clientPromise;
      const database = client.db('udb'); // Replace with your database name
      const users = database.collection<User>('users');

      const user = await users.findOne({ wallet: wallet as string });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        swipes: user.swipes,
        xp: user.profile.xp,
        rxp: user.profile.rxp,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}