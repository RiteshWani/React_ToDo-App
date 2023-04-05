import React, { useState, useEffect } from 'react'

// Form
const Form = ({ setinputText, todos, setTodos, inputText, setStatus }) => {
  const inputTextHandler = (e) => {
    // console.log(e.target.value);
    setinputText(e.target.value);
  }
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, {text: inputText, completed: false, id: Math.random() * 1000}]);
    setinputText("");
  }
  const statusHandler = (e) => {
    setStatus(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <form>
      <input type='text' value={inputText} placeholder='Add To-Do' className='todo-input' onChange={inputTextHandler} />
      <button onClick={submitTodoHandler} className='todo-button' type='submit'>
        <i className='fas fa-plus-square'></i>
      </button>
      <div className='select'>
        <select onChange={statusHandler} name='todos' className='filter-todo'>
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='uncompleted'>Uncompleted</option>
        </select>
      </div>
    </form>
  )
}

// To-dos
const Todos = ({ text, todos, setTodos, todo }) => {
  //Events
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  }
  const completeHandler = () => {
    setTodos(todos.map((item) => {
      if(item.id === todo.id){
        return{
          ...item, completed: !item.completed
        };
      }
      return item;
    }))
  }

  return (
    <>
    <div className="todo">
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
    <button className='complete-btn' onClick={completeHandler}>
      <i className='fas fa-check'></i>
    </button>
    <button onClick={deleteHandler} className='trash-btn'>
      <i className='fas fa-trash'></i>
    </button>
    </div>
    </>
  )
}

const ToDoList = ({ todos, setTodos, filteredTodos }) => {
  return(
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todos key={todo.id} text={todo.text} todos={todos} setTodos={setTodos} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default function ToDo() {
  const [inputText, setinputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])
  // Run once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <>
    <div className='App'>
      <header>
        To-Do List
      </header>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setinputText={setinputText} setStatus={setStatus} />
      <ToDoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
    </>
  )
}
