import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";

function App() {
  // data states
  const [toDos, setToDos] = useState([]);

  // filters states
  const [toDoStatus, setToDoStatus] = useState("all");

  // data input states
  const [inputToDo, setInputToDo] = useState("");

  // @utility: extract data from local storage on initial render
  useEffect(() => {
    const localStorageData = localStorage.getItem("toDos");
    if (localStorageData === null) {
      localStorage.setItem("toDos", JSON.stringify([]));
      return;
    }
    try {
      let parsedLocalStorageData = JSON.parse(localStorageData);
      setToDos(parsedLocalStorageData);
    } catch (error) {
      console.log("error : ", error);
    }
  }, []);

  return (
    <div>
      <header>
        <h1>to do list</h1>
      </header>
      <Form
        setInputToDo={setInputToDo}
        setToDos={setToDos}
        items={toDos}
        inputToDo={inputToDo}
        setToDoStatus={setToDoStatus}
      />
      <ToDoList items={toDos} setToDos={setToDos} status={toDoStatus} />
    </div>
  );
}

export default App;
