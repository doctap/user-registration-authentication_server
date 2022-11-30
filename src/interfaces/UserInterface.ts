export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	status: boolean;

	/** @format date-time */
	registrationDate: Date;

	/** @format date-time */
	lastLogin: Date;
}

export type hashSizes = 512 | 224 | 256 | 384;

export interface IRequestUserId { usersId: number[] }

export interface ITypedRequestBody<T> extends Express.Request { body: T }

export type isSucceeded = [{ done: boolean }, any];

export interface IEmail { email: string; }

export type BodyAnswer = [IEmail[], any]

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