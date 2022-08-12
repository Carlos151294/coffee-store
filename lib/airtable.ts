const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const table = base('coffee-stores');

const mapRecords = (records) => records.map((record) => record.fields);

export { table, mapRecords };
