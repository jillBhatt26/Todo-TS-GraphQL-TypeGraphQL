import { Schema, model } from 'mongoose';
import { ITodoSchema } from '@interfaces';

const TodoSchema = new Schema<ITodoSchema>(
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
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Todos = model('todos', TodoSchema);

export default Todos;
