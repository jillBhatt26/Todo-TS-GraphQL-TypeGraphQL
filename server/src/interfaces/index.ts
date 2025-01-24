import { ETodoStatus } from '@enums';
import { Document } from 'mongoose';

export interface ITodo extends Document {
    name: string;
    description: string;
    status: ETodoStatus;
}

export interface ICreateTodoArgs {
    name: string;
    description: string;
    status: ETodoStatus;
}

export interface IServerResponse<T = undefined> {
    success: boolean;
    data?: T;
    error?: string;
}
