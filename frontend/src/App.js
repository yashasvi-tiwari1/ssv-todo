import { useCallback, useEffect, useState } from "react";

function App() {
  const uri = "http://localhost:5000";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = useCallback(() => {
    fetch(uri)
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.error(error));
  }, [uri]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const getInput = (e) => {
    setInput(e.target.value);
    // console.log(e.target.value);
  };

  function addItems() {
    let information = {
      description: input,
    };

    // setInput();
    // console.log(input);
    fetch(uri, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(information),
    })
        .then((res) => {
          fetchTodos();
        })
        .catch((error) => console.error(error));

    setInput("");
    console.log('k xa')
  }
  function updateById(id, value) {
    let info = {
      description: value,
    };
    fetch(`${uri}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
        .then((response) => {
          fetchTodos();
        })
        .catch((error) => console.error(error));
  }
  function deleteById(id) {
    fetch(`${uri}/${id}`, {
      method: "DELETE",
    })
        .then((response) => {
          fetchTodos();
        })
        .catch((error) => console.error(error));
  }

  function deleteAll() {
    fetch(uri, {
      method: "DELETE",
    })
        .then((res) => {
          fetchTodos();
        })
        .catch((error) => console.error(error));
  }

  return (
      <div className="app-body">
        <div className="container">
          <h1>Todos App</h1>
          <div className="input-col">
            <input type="text" className="input" onChange={getInput} />
            { input !== "" &&(
                <button className="add" onClick={addItems}>
                  +
                </button>
            )}
          </div>
          <div className="items-body">
            {todos.map((todo, index) => {
              return (
                  <TodoItem
                      key={todo._id}
                      val={todo.description}
                      setUpdate={(value) => updateById(todo._id, value)}
                      deleteItem={() => deleteById(todo._id)}
                  />
              );
            })}
          </div>
          <button className="clearall" onClick={deleteAll}>
            Clear All
          </button>
        </div>
      </div>
  );
}

function TodoItem({ val, setUpdate, deleteItem }) {
  const [value, setValue] = useState(val);

  const getUpdate = (e) => {
    setValue(e.target.value);
  };

  return (
      <div className="todo-item">
        <input className="items" type="text" onChange={getUpdate} value={value} />
        {val !== value && (
            <button onClick={() => setUpdate(value)} className="update-btn">
              update
            </button>
        )}
        <button onClick={deleteItem} className="delete-btn">
          Delete
        </button>
      </div>
  );
}
export default App;