import { processWaterData } from '../../../lib/dataprocessor';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await processWaterData();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
