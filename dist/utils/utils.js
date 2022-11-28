"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHash = exports.getNowDate = void 0;
const sha3_1 = require("sha3");
const getNowDate = (date, time) => `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}${time ? ' ' + date.toLocaleTimeString() : ''}`;
exports.getNowDate = getNowDate;
const getHash = (a, size) => new sha3_1.SHA3(size).update(a).digest('hex');
exports.getHash = getHash;
//# sourceMappingURL=Utils.js.map