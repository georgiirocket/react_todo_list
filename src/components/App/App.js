import React from 'react';

import './App.css';
import AppHeader from '../AppHeader';
import SearchBlock from '../SearchBlock';
import TodoList from '../TodoList';
import ItemAddForm from '../ItemAddForm';
import ItemStatusFilter from '../ItemStatusFilter';

class App extends React.Component {

  ids = 10;

  state = {
    todoData: [
      { label: 'Learn HTML', important: false, done: false, id: 1, },
      { label: 'Learn JS', important: false, done: false, id: 2, },
      { label: 'Learn React', important: false, done: false, id: 3, },
    ],
    detectedText: '',
    filter: 'all', // all, active, done
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
      const index = prevState.todoData.findIndex((elem) => elem.id === id);
      
      const newTodoData = [
        ...prevState.todoData.slice(0, index),
        ...prevState.todoData.slice(index + 1)
      ];

      return {
        todoData: newTodoData
      };
    });
  }

  addItem = (text) => {
    const item = {
      label: text,
      important: false,
      id: this.ids++
    }

    this.setState(({ todoData }) => {
      const newArr = [...todoData, item];

      return {
        todoData: newArr
      }
    });
  }

  toggleProp = (id, arr, prop) => {
    const index = arr.findIndex((elem) => elem.id === id);

    const oldObj = arr[index];
    const newObj = {...oldObj, [prop]: !oldObj[prop]};

    return [
      ...arr.slice(0, index),
      newObj,
      ...arr.slice(index + 1)
    ];
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(id, todoData, 'done')
      };
    });
  }

  toggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(id, todoData, 'important')
      };
    });
  }

  onSearchChange = (detectedText) => {
    this.setState({ detectedText });
  }

  search = (arr, detectedText) => {
    if (detectedText.length === 0) {
      return arr;
    }

    return arr.filter((el) => {
      return el.label.toUpperCase()
        .indexOf(detectedText.toUpperCase()) > -1;
    });
  }

  itemsFilter = (arr, filterText) => {
    switch(filterText) {
      case 'all':
        return arr;
      case 'active':
        return arr.filter((el) => !el.done);
      case 'done':
        return arr.filter((el) => el.done);
      default:
        return arr;
    }
  }

  onItemsFilterChange = (filter) => {
    this.setState({filter});
  }

  render() {

    const { todoData, detectedText, filter } = this.state;
    const detectedItems = this.itemsFilter(this
      .search(todoData, detectedText), filter);
    const done = todoData.filter((el) => el.done).length;
    const todo = todoData.length - done;

    return (
      <div className="App">
        <AppHeader toDo={todo} done={done}/>
        <div className="searchPanel d-flex">
          <SearchBlock onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onItemsFilterChange={this.onItemsFilterChange}
          />
        </div>
        <TodoList
          todoItems={detectedItems}
          onDelete={this.deleteIte}
          onToggleImportant={ this.toggleImportant }
          onToggleDone={ this.toggleDone }
        />
        <ItemAddForm onItemAdd={ this.addItem } />
      </div>
    );
  }
}

export default App;