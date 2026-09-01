import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Airtable from 'airtable';

dotenv.config();

const app = express();
const PORT = 5000;

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  throw new Error('Missing Airtable environment variables in .env');
}

const base = new Airtable({ apiKey }).base(baseId);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is alive and running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});