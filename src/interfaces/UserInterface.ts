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

export interface IRequestUserId {
	usersId: number[]
}

export interface ITypedRequestBody<T> extends Express.Request {
	body: T
}