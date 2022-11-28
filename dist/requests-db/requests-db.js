"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'myApp'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err)
        throw err;
    console.log('The solution is: ', rows);
});
connection.end();
//# sourceMappingURL=requests-db.js.map