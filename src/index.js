import React from 'react';
import ReactDom from 'react-dom';

const el = (
  <div>
    <h1>Todo List</h1>
    <input placeholder='search' />
    <ul>
      <li>Learn JS</li>
      <li>Learn React</li></ul>
  </div>
);
ReactDom.render(el, document.getElementById('root'));