import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
	origin: '*'
}));

app.get('/api/users', (req: Request, res: Response) => {
	res.send(
		require('../data/users/users.json')
	);
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});