import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherApp from './api/WeatherApp';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { WbSunny } from '@mui/icons-material';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Low');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  const [isWeatherVisible, setIsWeatherVisible] = useState(false); // Weather toggle

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication function
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  useEffect(() => {
    const authState = localStorage.getItem('auth');
    if (authState) {
      setIsAuthenticated(true);
    }

    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleAddTodo = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const assignedOn = `${dd}-${mm}-${yyyy}`;

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      assignedOn,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle('');
    setNewDescription('');
    setNewPriority('Low');
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    const now = new Date();
    const dd = now.getDate();
    const mm = now.getMonth() + 1;
    const yyyy = now.getFullYear();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    const filteredItem = {
      ...allTodos[index],
      completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, title: value }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, description: value }));
  };

  const handleUpdatePriority = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, priority: value }));
  };

  const handleUpdateToDo = () => {
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'white';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <h1>Welcome to My Todos App</h1>
        <button onClick={handleLogin} className="primaryBtn">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="App">
       <div className="header">
        <h1>My Todos</h1>
        <WbSunny
          className="weather-icon"
          title="Show Weather"
          onClick={() => setIsWeatherVisible(!isWeatherVisible)}
        />
      </div>

      {isWeatherVisible && <WeatherApp />}
      <button onClick={handleLogout} className="secondaryBtn">
        Logout
      </button>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <label>Priority</label>
            <select
              className="priority"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {!isCompleteScreen &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit__wrapper" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Description"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <select
                      className="priority"
                      value={currentEditedItem.priority}
                      onChange={(e) => handleUpdatePriority(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    className="todo-list-item"
                    key={index}
                    style={{
                      borderLeft: `5px solid ${getPriorityColor(item.priority)}`,
                    }}
                  >
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>Priority: {item.priority}</small>
                      </p>
                      <p>
                        <small>Assigned on: {item.assignedOn}</small>
                      </p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="check-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Priority: {item.priority}</small>
                  </p>
                  <p>
                    <small>Completed on: {item.completedOn}</small>
                  </p>
                </div>

                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
