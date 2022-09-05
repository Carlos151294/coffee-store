import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

const CoffeeStores = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { latLong, limit } = req.query;

    if (!latLong) {
      return res.status(500).json({ message: 'Missing latLong param' });
    }
    if (!limit) {
      return res.status(500).json({ message: 'Missing limit param' });
    }

    const response = await fetchCoffeeStores(
      latLong as string,
      parseInt(limit as string)
    );
    res.status(200).json(response);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default CoffeeStores;
