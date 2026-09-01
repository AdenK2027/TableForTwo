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
  throw new Error('Issue reading from .env file');
}

const base = new Airtable({ apiKey }).base(baseId);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server running');
});

app.get('/api/recipes', async (req: Request, res: Response) => {
  try {
    const records = await base('Recipes').select().all();

    const formattedRecipes = records.map((record) => ({
      id: record.id,
      name: record.get('name'),
      thumbnail: record.get('thumbnail'),
    }));

    res.json(formattedRecipes);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});