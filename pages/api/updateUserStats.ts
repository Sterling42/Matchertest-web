// pages/api/updateUserStats.ts
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
  if (req.method === 'POST') {
    const { walletAddress, swipes, xp, rxp, tokenAddress, action } = req.body;

    try {
      const client = await clientPromise;
      const database = client.db('udb'); // Replace with your database name
      const users = database.collection<User>('users');

      // Check if the tendency for the token address exists
      const user = await users.findOne({ wallet: walletAddress, [`opinions.tendencies.${tokenAddress}`]: { $exists: true } });

      let update;
      if (user) {
        // If the tendency exists, use $inc to update it
        update = {
          $inc: {
            swipes: -swipes,
            totalSwipes: 1,
            'profile.xp': xp,
            'profile.rxp': rxp,
            [`opinions.tendencies.${tokenAddress}`]: action === 'like' ? 1 : -1,
          },
        };
      } else {
        // If the tendency does not exist, use $set to initialize it
        update = {
          $inc: {
            swipes: -swipes,
            totalSwipes: 1,
            'profile.xp': xp,
            'profile.rxp': rxp,
          },
          $set: {
            [`opinions.tendencies.${tokenAddress}`]: action === 'like' ? 1 : -1,
          },
        };
      }

      const result = await users.updateOne(
        { wallet: walletAddress },
        update,
        { upsert: true }
      );

      if (result.modifiedCount === 0 && result.upsertedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User stats updated successfully' });
    } catch (error) {
      console.error('Error updating user stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}