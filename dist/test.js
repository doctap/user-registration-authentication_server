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
    database: 'myApp',
});
const sql = `SELECT * FROM Users`;
connection.query(sql, function (err, results) {
    if (err)
        console.log(err);
    console.log(results);
});
connection.end();
//# sourceMappingURL=test.js.map