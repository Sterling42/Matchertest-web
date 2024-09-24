import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { TokenInfo } from './interface/token';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect();
    const database = client.db('alltokens');
    const collection = database.collection('tokenlist');
    const tokens = await collection.find({}).toArray();
    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}