import axios, { AxiosResponse } from "axios";
import { IUser, ConverseResponse, IRegistrationData, IAuthenticationData, isSucceeded } from "./data-contracts";
import { convertUsers } from "../utils/Utils";

const serveUrl = 'http://localhost:8000';

export async function getUsers() {
	const res = await axios.get<IUser[]>(`${serveUrl}/api/users`)
	return convertUsers(res.data)
}

export async function deleteUsers(usersId: number[]) {
	const res = await axios.delete<any, AxiosResponse<ConverseResponse>, number[]>(`${serveUrl}/delete-users`, {
		headers: { 'Content-Type': 'application/json' },
		data: usersId,
	});
	return convertUsers(res.data[0]);
}

export async function blockUsers(usersId: number[]) {
	const res = await axios.post<number[], AxiosResponse<ConverseResponse>>(`${serveUrl}/block-users`, { usersId });
	return convertUsers(res.data[0]);
}

export async function unblockUsers(usersId: number[]) {
	const res = await axios.post<number[], AxiosResponse<ConverseResponse>>(`${serveUrl}/unblock-users`, { usersId });
	return convertUsers(res.data[0]);
}

export async function registrationUser(userData: IRegistrationData) {
	const res = await axios.post<IRegistrationData, AxiosResponse<isSucceeded>>(`${serveUrl}/registration`, userData);
	return res.data;
}

export async function authenticationUser(userData: IAuthenticationData) {
	const res = await axios.post<IAuthenticationData, AxiosResponse<isSucceeded>>(`${serveUrl}/authentication`, userData);
	return res.data;
}