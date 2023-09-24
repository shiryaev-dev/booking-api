export interface ICreateUser {
    name: string;
    email: string;
    password?: string;
    passwordHash?: string;
    role: string;
    phone: string;
}
