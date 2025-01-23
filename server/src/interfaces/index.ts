import { ETodoStatus } from '@enums';
import { Document } from 'mongoose';

export interface ITodoSchema extends Document {
    name: string;
    description: string;
    status: ETodoStatus;
}

export interface ITodo {
    id: string;
    name: string;
    description: string;
    status: ETodoStatus;
}
