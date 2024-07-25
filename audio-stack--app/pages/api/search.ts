import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async ({ query: { q } }: NextApiRequest, res: NextApiResponse) => {
  if (!q) {
    return res.status(400).json({ error: 'Query parameter is missing' });
  }

  try {
    const response = await fetch(`https://api.discogs.com/database/search?q=${q}&type=artist`, {
      headers: {
        'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
