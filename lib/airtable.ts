const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const table = base('coffee-stores');

const mapRecords = (records) =>
  records.map((record) => ({ ...record.fields, airtableId: record.id }));

const findRecord = async (id) => {
  const coffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return mapRecords(coffeeStoreRecords);
};

const updateRecord = (id, updatedRecord): Promise<any> => {
  return table.update([
    {
      id,
      fields: {
        ...updatedRecord,
      },
    },
  ]);
};

export { table, mapRecords, findRecord, updateRecord };
