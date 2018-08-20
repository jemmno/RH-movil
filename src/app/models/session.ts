import { User } from '../models/user';

export interface Session {
    user: User;
    logged: boolean;
}
