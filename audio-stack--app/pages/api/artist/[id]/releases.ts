import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const releasesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const token = process.env.DISCOGS_TOKEN || '';

  try {
    const response = await axios.get(`https://api.discogs.com/artists/${id}/releases`, {
      params: { page: req.query.page, per_page: req.query.per_page },
      headers: { Authorization: `Discogs token=${token}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default releasesHandler;
