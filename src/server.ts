import express, { Express, Request, Response } from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { BodyAnswer, IAuthenticationData, IRegistrationData, IRequestUserId, isSucceeded, ITypedRequestBody } from 'interfaces/UserInterface';
import { getHash, getNowDate } from './utils/Utils'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const urlencodedParser = express.urlencoded({ extended: false });

const pool = mysql.createPool({
	connectionLimit: 5,
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'myApp',
}).promise();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.get('/api/users', (req: Request, res: Response) => {
	pool.query(`SELECT * FROM Users`)
		.then(r => res.send(r[0]))
		.catch(e => console.log(e.message));
});

app.post('/block-users', urlencodedParser, (req: ITypedRequestBody<IRequestUserId>, res: Response) => {
	const usersId = req.body.usersId;
	if (!req.body)
		return res.sendStatus(400);
	if (usersId.length > 0) {
		pool.query(`UPDATE Users SET isBlocked=1 WHERE id in (${usersId.join()})`)
			.then(() => pool.query(`SELECT * FROM Users`))
			.then(r => res.send(r))
			.catch(e => console.log(e.message))
	}
});

app.post('/unblock-users', urlencodedParser, (req: ITypedRequestBody<IRequestUserId>, res: Response) => {
	const usersId = req.body.usersId;
	if (!req.body)
		return res.sendStatus(400);
	if (usersId.length > 0) {
		pool.query(`UPDATE Users SET isBlocked=0 WHERE id in (${usersId.join()})`)
			.then(() => pool.query(`SELECT * FROM Users`))
			.then(r => res.send(r))
			.catch(e => console.log(e.message))
	}
});

app.delete('/delete-users', urlencodedParser, (req: ITypedRequestBody<number[]>, res: Response) => {
	const usersId = req.body;
	if (!req.body)
		return res.sendStatus(400);
	if (usersId.length > 0) {
		pool.query(`DELETE FROM Users WHERE id in (${usersId.join()})`)
			.then(() => pool.query(`SELECT * FROM Users`))
			.then(r => res.send(r))
			.catch(e => console.log(e.message))
	}
});

app.post('/registration', urlencodedParser, (req: ITypedRequestBody<IRegistrationData>, res: Response) => {
	const userData = req.body;
	const today = new Date();
	if (!userData)
		return res.sendStatus(400);

	pool.query(
		`INSERT Users(firstName, lastName, lastLogin, registrationDate, isBlocked, email, hash)
		VALUES ( 
			"${userData.firstName}",
			"${userData.lastName}",
			"${getNowDate(today, true)}",
			"${getNowDate(today, false)}",
			FALSE,
			"${userData.email}",
			"${getHash(userData.password, 256)}");`
	).then(
		() => pool.query<isSucceeded>(
			`SELECT IF (EXISTS (SELECT email FROM Users WHERE email="${userData.email}"), 1,0) AS isSucceeded;`
		).then(r => res.send(r[0][0]))
	).catch(e => console.log(e.message))
});

app.post('/authentication', urlencodedParser, (req: ITypedRequestBody<IAuthenticationData>, res: Response) => {
	const userData = req.body;
	if (!userData)
		return res.sendStatus(400);

	pool.query<isSucceeded>(
		`SELECT IF (EXISTS (SELECT email, hash, isBlocked FROM Users
			WHERE email="${userData.email}" AND hash="${getHash(userData.password, 256)}" AND isBlocked=0), 1,0) AS isSucceeded;`
	).then(r => res.send(r[0][0]))
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
