import React from "react";

function ToDoList({ items, status = "all", setToDos, toDoStatus }) {
  // @utility: save the data in local storage as a reusable function
  const saveDataInLocalStorage = (data) => {
    localStorage.setItem("toDos", JSON.stringify(data));
  };

  // @utility: used for prefilter the data before mapping
  const getFilteredToDos = () => {
    switch (status) {
      case "completed":
        return items.filter((todo) => todo.completed);
      case "uncompleted":
        return items.filter((todo) => !todo.completed);
      default:
        return items;
    }
  };

  // @utility:handler for deleting an item from to do list
  const deleteToDoHandler = (id) => {
    const newTodos = items.filter((elm) => elm.id !== id);
    // remove item from array
    setToDos([...newTodos]);

    // update localstorage
    saveDataInLocalStorage(newTodos);
  };

  // @utility: handler for when setting a todo as completed
  const completeTheToDo = (id) => {
    const newTodos = items.map((elm) => {
      if (elm.id === id) {
        return {
          ...elm,
          completed: !elm.completed,
        };
      }
      return elm;
    });

    // remove item from array
    setToDos([...newTodos]);

    // update localstorage
    saveDataInLocalStorage(newTodos);
  };

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {getFilteredToDos().map((item, index) => {
          const { text, completed, id } = item;
          return (
            <div className="todo" key={index}>
              <li className={`todo-item ${completed ? "completed" : ""}`}>
                {text}
              </li>
              <button
                className="complete-btn"
                onClick={() => completeTheToDo(id)}
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                className="trash-btn"
                onClick={() => deleteToDoHandler(id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
