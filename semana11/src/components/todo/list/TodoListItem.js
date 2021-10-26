import React from 'react';

export const TodoListItem = ({ todo, index, handleToggle, handleDelete }) => {
  const toggleHandler = () =>{
    const newTodo = {
      index: index,
    }
    handleToggle(newTodo);
  }

  const deleteHandler = () => {
    const newTodo = {
      id: index
    }
    handleDelete(newTodo);
  }

  return (
    <li key={todo.id} className='list-group-item'>
      <p onClick={toggleHandler} className={todo.done?"selected":""}>
        {index + 1}. {todo.desc}
      </p>
      <button
        className='btn btn-danger'
        onClick={deleteHandler}
      >
        Borrar
      </button>
    </li>
  );
};
