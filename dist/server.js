"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const Utils_1 = require("./utils/Utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const urlencodedParser = express_1.default.urlencoded({ extended: false });
const pool = mysql2_1.default.createPool({
    connectionLimit: 5,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'myApp',
}).promise();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(bodyParser.json());
app.get('/api/users', (req, res) => {
    pool.query(`SELECT * FROM Users`)
        .then(r => res.send(r[0]))
        .catch(e => console.log(e.message));
});
app.post('/block-users', urlencodedParser, (req, res) => {
    const usersId = req.body.usersId;
    if (!req.body)
        return res.sendStatus(400);
    if (usersId.length > 0) {
        pool.query(`UPDATE Users SET isBlocked=1 WHERE id in (${usersId.join()})`)
            .then(() => pool.query(`SELECT * FROM Users`))
            .then(r => res.send(r))
            .catch(e => console.log(e.message));
    }
});
app.post('/unblock-users', urlencodedParser, (req, res) => {
    const usersId = req.body.usersId;
    if (!req.body)
        return res.sendStatus(400);
    if (usersId.length > 0) {
        pool.query(`UPDATE Users SET isBlocked=0 WHERE id in (${usersId.join()})`)
            .then(() => pool.query(`SELECT * FROM Users`))
            .then(r => res.send(r))
            .catch(e => console.log(e.message));
    }
});
app.delete('/delete-users', urlencodedParser, (req, res) => {
    const usersId = req.body;
    if (!req.body)
        return res.sendStatus(400);
    if (usersId.length > 0) {
        pool.query(`DELETE FROM Users WHERE id in (${usersId.join()})`)
            .then(() => pool.query(`SELECT * FROM Users`))
            .then(r => res.send(r))
            .catch(e => console.log(e.message));
    }
});
app.post('/registration', urlencodedParser, (req, res) => {
    const userData = req.body;
    const today = new Date();
    if (!userData)
        return res.sendStatus(400);
    pool.query(`INSERT Users(firstName, lastName, lastLogin, registrationDate, isBlocked, email, hash)
		VALUES ( 
			"${userData.firstName}",
			"${userData.lastName}",
			"${(0, Utils_1.getNowDate)(today, true)}",
			"${(0, Utils_1.getNowDate)(today, false)}",
			FALSE,
			"${userData.email}",
			"${(0, Utils_1.getHash)(userData.password, 256)}");`).then(() => pool.query(`SELECT IF (EXISTS (SELECT email FROM Users WHERE email="${userData.email}"), 1,0) AS isSucceeded;`).then(r => res.send(r[0][0]))).catch(e => console.log(e.message));
});
app.post('/authentication', urlencodedParser, (req, res) => {
    const userData = req.body;
    if (!userData)
        return res.sendStatus(400);
    pool.query(`SELECT IF (EXISTS (SELECT email, hash, isBlocked FROM Users
			WHERE email="${userData.email}" AND hash="${(0, Utils_1.getHash)(userData.password, 256)}" AND isBlocked=0), 1,0) AS isSucceeded;`).then(r => res.send(r[0][0]));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map