import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Todo = {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
};

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
    const API = `${API_BASE}/a5/todos`;
    const [todo, setTodo] = useState({
        id: 1,
        title: "WebDev: NodeJS",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [todos, setTodos] = useState<Todo[]>([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        const newTodos = [...todos, response.data];
        setTodos(newTodos);
    }
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    const removeTodo = async (todo: Todo) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    const deleteTodo = async (todo: Todo) => {
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
    };
    const updateTodo = async () => {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    };
    useEffect(() => {
        fetchTodos();
    }, [todos]);

    return (
        <div>
            <h2>Working with Arrays</h2>
            <label>Title<input type="text" value={todo.title}
                className="form-control"
                onChange={(e) => setTodo({
                    ...todo,
                    title: e.target.value
                })} /></label>
            <label>Description<textarea value={todo.description}
                className="form-control"
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} /></label>
            <input value={todo.due} type="date"
                onChange={(e) => setTodo({
                    ...todo, due: e.target.value
                })} />
            <label>Completed?<input type="checkbox" value={todo.completed.toString()}
                className="form-check-input"
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked
                })} /></label>
            <button className="btn btn-warning" onClick={postTodo}> Post Todo </button>
            <button className="btn btn-success" onClick={updateTodo}>
                Update Todo
            </button>
            {/*<h3>Updating an Item in an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a><br></br>
            <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`} >
                Complete Todo ID = {todo.id}
            </a><br></br>
            <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`} >
                Describe Todo ID = {todo.id}
            </a>
            <h4>Retrieving Arrays</h4>
            <a className="btn btn-secondary" href={API}>
                Get Todos
            </a>
            <h4>Retrieving an Item from an Array by ID</h4>
            <a className="btn btn-secondary" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <h3>Filtering Array Items</h3>
            <a className="btn btn-secondary" href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <h3>Creating new Items in an Array</h3>
            <a className="btn btn-success" href={`${API}/create`}>
                Create Todo
            </a>
            <button className="btn btn-primary" onClick={createTodo} >
                Create Todo
            </button>
            <button className="btn btn-success" onClick={updateTitle} >
                Update Title
            </button>
            <h3>Deleting from an Array</h3>
            <a className="btn btn-danger" href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>*/}
            <ul className="list-group list-group-flush">
                {todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        <input checked={todo.completed}
                            type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>
                        <button className="btn btn-warning"
                            onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>
                        <button onClick={() => deleteTodo(todo)}
                            className="btn btn-danger">
                            Delete
                        </button>
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default WorkingWithArrays;