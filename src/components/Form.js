import React from "react";

function Form({ inputToDo, setInputToDo, items, setToDos, setToDoStatus }) {
  // @utility: for handling onChanges
  const onChangeToDo = (event) => {
    if (event.target.value.length > 0) {
      setInputToDo(event.target.value);
    }
  };

  // @utility: adding a new item by submit button
  const submitToDoHandler = () => {
    if (inputToDo === "") {
      return;
    }

    // set the new data
    const newTodos = [
      ...items,
      { text: inputToDo, completed: false, id: Math.random() * 1000 },
    ];
    setToDos(newTodos);

    // reset input field
    setInputToDo("");

    // save changes in local storage
    localStorage.setItem("toDos", JSON.stringify(newTodos));
  };

  // @utility: for setting the to do handler
  const setTheToDoStatusHandler = (event) => {
    setToDoStatus(event.target.value);
  };
  return (
    <form>
      <input
        type="text"
        className="todo-input"
        onChange={onChangeToDo}
        value={inputToDo}
        onKeyDown={(event) => {
          // Check if the key pressed is 'Enter'
          if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action to avoid form submit
            submitToDoHandler(); // Call the function to handle the submission
          }
        }} // Add the key press listener here
      />
      <button
        className="todo-button"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submitToDoHandler();
        }}
      >
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select
          onChange={setTheToDoStatusHandler}
          name="todos"
          className="filter-todo"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;
