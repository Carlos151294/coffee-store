import { NextApiRequest, NextApiResponse } from 'next';
import { mapRecords, table } from '../../lib/airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const newRecord = req.body;

  switch (req.method) {
    case 'POST':
      try {
        // Validate data
        if (!newRecord.id || !newRecord.name) {
          return res.status(400).json({ message: 'Id or name is missing' });
        }

        // Find record
        const coffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${newRecord.id}"`,
          })
          .firstPage();

        if (coffeeStoreRecords.length > 0) {
          res.json(mapRecords(coffeeStoreRecords));
        } else {
          // Create record
          const records = await table.create([
            {
              fields: { ...newRecord },
            },
          ]);
          res.json({ message: 'records created', record: mapRecords(records) });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error finding store', error });
      }
      break;
    default:
      try {
        const { id } = req.query;
        const coffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (coffeeStoreRecords.length > 0) {
          res.json(mapRecords(coffeeStoreRecords));
        } else {
          res.status(500).json({ message: 'Error finding coffee store' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error finding coffee store', error });
      }
      break;
  }
};
