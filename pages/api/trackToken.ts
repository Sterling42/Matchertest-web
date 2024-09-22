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
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { address, action } = req.body;

  if (!address || !['like', 'dislike'].includes(action)) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  try {
    const client = await clientPromise;
    const database = client.db('stats');
    const collection = database.collection('tokenstats');

    const update = action === 'like' ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
    const result = await collection.updateOne({ address }, update, { upsert: true });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}