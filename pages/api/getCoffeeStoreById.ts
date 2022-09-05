import { NextApiRequest, NextApiResponse } from 'next';

import { findRecord } from '../../lib/airtable';

const getCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  try {
    if (id) {
      // Find record
      const coffeeStoreRecords = await findRecord(id);

      if (coffeeStoreRecords.length > 0) {
        res.json(coffeeStoreRecords[0]);
      } else {
        res.json({ message: 'Id not found' });
      }
    } else {
      res.status(400).json({ message: 'Id or name is missing' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
};

export default getCoffeeStoreById;
