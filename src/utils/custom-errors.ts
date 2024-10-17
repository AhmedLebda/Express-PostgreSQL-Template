export class JwtError extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.statusCode = 401;
		this.name = "JwtError";
	}
}

export class InactiveAccountError extends Error {
	public statusCode: number;

	constructor(message: string = "User account is inactive") {
		super(message);
		this.name = "InactiveAccountError";
		this.statusCode = 403;
	}
}

export class AssociatedDataError extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.statusCode = 400;
		this.name = "AssociatedDataError";
	}
}

export class MissingConfigError extends Error {
	statusCode: number;

	constructor(variableName: string) {
		super(`Configuration error: ${variableName} is not defined.`);
		this.name = "MissingConfigError";
		this.statusCode = 500;
	}
}

export class UserNotFoundError extends Error {
	statusCode: number;

	constructor(message: string = "User not found") {
		super(message);
		this.name = "UserNotFoundError";
		this.statusCode = 404;
	}
}
