import { IAuthenticationData } from "../api/data-contracts";

export const convertUsers = <T>(users: T[]) => users.map(u => ({ ...u, isChecked: false }));

export const addUserInLocalStorage = (data: IAuthenticationData) => localStorage.setItem(`user`, JSON.stringify({ email: data.email, password: data.password }));

export const getDate = (date: Date, time: boolean) =>
	`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}${time ? ' ' + date.toLocaleTimeString() : ''}`;