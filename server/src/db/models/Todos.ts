import { Schema, model } from 'mongoose';
import { ITodo } from '@interfaces';
import { ETodoStatus } from '@enums';

const TodoSchema = new Schema<ITodo>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'progress', 'completed'],
            required: true,
            default: ETodoStatus.PENDING
        }
    },
    {
        timestamps: true
    }
);

const Todos = model('todos', TodoSchema);

export default Todos;
