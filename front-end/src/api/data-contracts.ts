export interface IConvertUserProp {
	isChecked: boolean;
}

export type User = IUser & IConvertUserProp;
export type ConverseResponse = [IUser[], any];
export type isSucceeded = {isSucceeded: boolean};

export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	isBlocked: boolean;

	/** @format date-time */
	registrationDate: string;

	/** @format date-time */
	lastLogin: string;
}

export interface IRegistrationData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface IAuthenticationData {
	email: string;
	password: string;
}