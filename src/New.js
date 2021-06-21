import { useState } from 'react';
import Data from "./Data";
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyle = makeStyles({
    root: {
        margin: '5px',
        fontSize: "10px"
    },
    btn: {
        width: '95%',
        padding: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '10px auto',
        color: "white",
        background: 'black'
    },
    h2: {

    }
});



const Todo = ({ todo, index, completeTodo, removeTodo }) => {
    const use = useStyle();
    return (
        <div className="container">
            <Paper className='inner' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
                <div className="text-section">
                    <h4 className="h4">{todo.text}</h4>
                    <h5>{todo.date}</h5>
                </div>
                <div className="btn-section">
                    <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        className={use.root}
                        startIcon={<SaveIcon />}
                        type="button"
                        onClick={() => completeTodo(index)}
                    >Complete
                    </Button>
                    <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        className={use.root}
                        startIcon={<DeleteIcon />}

                        type="button"
                        onClick={() => removeTodo(index)}
                    >Delete
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

// form section 
const AddForm = ({ addTodo }) => {
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const use = useStyle();

    const handler = () => {
        if (!value || !date) {
            alert("Both Inputs must be filled!");
        } else {
            addTodo(value, date);
            setDate('');
            setValue('');
        }
    }

    return (
        <form className="todo-form">
            <h2 className="h2">A Todo List</h2>
            <TextField
                type="text"
                className="input"
                label=" Add Item"
                variant="outlined"
                helperText="Please write Your Todo Item"
                style={{ margin: '5px 0' }}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <TextField
                type="time"
                className="input"
                value={date}
                label=" Add Time"
                helperText="Please Add Time"
                variant="outlined"
                style={{ margin: '5px 0' }}
                onChange={e => setDate(e.target.value)}
            />
            <Button startIcon={<AddIcon />} type="button" className={use.btn} onClick={handler}>Add List</Button>
        </form >
    );
}


// Main component
const New = () => {

    const [todo, setTodo] = useState(Data);

    // adding a new item to the list of objects...
    const addTodo = (text, date) => {
        const newTodo = [...todo, { text, date }];
        setTodo(newTodo);
    }

    const completeTodo = index => {
        const newTodo = [...todo];
        newTodo[index].isCompleted = true;
        setTodo(newTodo);
    }

    const removeTodo = index => {
        const removeTodoList = [...todo];
        removeTodoList.splice(index, 1);
        setTodo(removeTodoList);
    }

    return (
        <div>
            <AddForm addTodo={addTodo} />
            {
                todo.map((todo, index) => {
                    return (
                        <Todo todo={todo} key={index} index={index} removeTodo={removeTodo} completeTodo={completeTodo} />
                    )
                })
            }

        </div>
    )
}

export default New;
