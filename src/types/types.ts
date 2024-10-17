export enum Role {
    Employee = "employee",
    Manager = "manager",
    Admin = "admin",
}

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    active: boolean;
    role: Role;
}

export type UserCreationAttributes = Pick<
    UserAttributes,
    "username" | "password"
>;

export interface CreateUserRequest {
    username: string;
    password: string;
}
