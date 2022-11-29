import { SHA3 } from "sha3";

type hashSizes = 512 | 224 | 256 | 384;

const getNowDate = (date: Date, time: boolean) =>
	`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}${time ? ' ' + date.toLocaleTimeString() : ''}`;

const getHash = (a: string, size: hashSizes) => new SHA3(size).update(a).digest('hex');

export { getNowDate, getHash };