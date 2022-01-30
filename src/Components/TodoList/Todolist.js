import React from "react";
import { useState, useEffect } from "react";
import todo from "../../Images/todo.svg";
import "./todo.css";

const getLocalstorageItems = () => {
  let list = localStorage.getItem("todos");

  if (list) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

const Todolist = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalstorageItems());
  const [toggleAdd, setToggleAdd] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const addItem = () => {
    if (!inputData) {
      alert("Cannot add empty data");
    } else if (inputData && !toggleAdd) {
      setItems(
        items.map((elem) => {
          if (elem.id === editItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleAdd(true);
      setInputData("");
      setEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const updateItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleAdd(false);
    setInputData(newEditItem.name);
    setEditItem(id);
  };

  const deleteItem = (index) => {
    //console.log(id);
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="TodoLogo" />
            <figcaption>Add Your Todos Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Todos..."
              value={inputData}
              onChange={handleInput}
            />
            {toggleAdd ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Todos"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Edit Todo"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((todo, index) => {
              return (
                <div className="eachItem" key={todo.id}>
                  <h3>{todo.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Todo"
                      onClick={() => updateItem(todo.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Todos"
                      onClick={() => deleteItem(todo.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
