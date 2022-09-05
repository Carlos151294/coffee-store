import { NextApiRequest, NextApiResponse } from 'next';
import { findRecord, mapRecords, updateRecord } from '../../lib/airtable';

const favoriteCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'PUT') {
    const { id } = req.query;

    try {
      if (id) {
        // Find record
        const coffeeStoreRecords = await findRecord(id);

        if (coffeeStoreRecords.length > 0) {
          const [record] = coffeeStoreRecords;

          const updatedVoting = parseInt(record.voting, 10) + 1;

          const updatedRecord = await updateRecord(record.airtableId, {
            voting: updatedVoting,
          });
          res.json(mapRecords(updatedRecord)[0]);
        } else {
          res.json({ message: 'Id not found' });
        }
      } else {
        res.status(400).json({ message: 'Id or name is missing' });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: 'Something went wrong', error });
    }
  }
};

export default favoriteCoffeeStoreById;
