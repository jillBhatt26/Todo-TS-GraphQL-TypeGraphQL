import {
    ObjectType,
    Field,
    ID,
    registerEnumType,
    Resolver,
    Query,
    Arg,
    Mutation,
    InputType
} from 'type-graphql';
import { Todos } from '@db';
import { ETodoStatus } from '@enums';
import { ITodo } from '@interfaces';

registerEnumType(ETodoStatus, {
    name: 'ETodoStatus', // Mandatory
    description: 'The current status of the given task' // Optional
});

// Types
@ObjectType({ description: 'The structure representing Todo in graphql API' })
class Todo {
    @Field(type => ID!, { nullable: false })
    id!: string;

    @Field(type => String!, { nullable: false })
    name!: string;

    @Field(type => String!, { nullable: false })
    description!: string;

    @Field(type => ETodoStatus!, { nullable: false })
    status!: ETodoStatus;
}

// Input Types
@InputType()
class AddTodoInput {
    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field({ nullable: true })
    status?: ETodoStatus;
}

@InputType()
class UpdateTodoInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    status?: ETodoStatus;
}

// Resolvers
@Resolver()
class TodoResolver {
    @Query(returns => [Todo]!)
    async todos() {
        try {
            const allTodos: ITodo[] = await Todos.find({});

            return allTodos;
        } catch (error: unknown) {
            throw error;
        }
    }

    @Query(returns => Todo)
    async todo(@Arg('id') id: string): Promise<ITodo> {
        try {
            const todo: ITodo | null = await Todos.findById(id);

            if (!todo) throw new Error('Required task not found!');

            return todo;
        } catch (error: unknown) {
            throw error;
        }
    }

    @Mutation(returns => Todo!)
    async createTodo(
        @Arg('createTodoData') createTodoData: AddTodoInput
    ): Promise<ITodo> {
        try {
            const newTodo = await Todos.create({
                name: createTodoData.name,
                description: createTodoData.description,
                status: createTodoData.status
            });

            return newTodo;
        } catch (error: unknown) {
            throw error;
        }
    }

    @Mutation(returns => Todo)
    async updateTodo(
        @Arg('id') id: string,
        @Arg('updateTodoData') updateTodoData: UpdateTodoInput
    ): Promise<ITodo> {
        try {
            const toUpdateTodo = await Todos.findById(id);

            if (!toUpdateTodo) throw new Error('Task to update not found!');

            const updatedTodo = await Todos.findByIdAndUpdate(
                id,
                {
                    $set: {
                        name: updateTodoData.name,
                        description: updateTodoData.description,
                        status: updateTodoData.status
                    }
                },
                {
                    new: true // return the updated document
                }
            );

            if (!updatedTodo) throw new Error('Failed to update task!');

            return updatedTodo;
        } catch (error: unknown) {
            throw error;
        }
    }

    @Mutation(returns => Boolean)
    async deleteTodo(@Arg('id') id: string): Promise<boolean> {
        try {
            const toDeleteTodo = await Todos.findById(id);

            if (!toDeleteTodo) throw new Error('Task to delete not found!');

            await Todos.findByIdAndDelete(id);

            return true;
        } catch (error: unknown) {
            throw error;
        }
    }
}

export { Todo, AddTodoInput, UpdateTodoInput, TodoResolver };
