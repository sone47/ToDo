import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './rem.js';
import '../css/index.css';

class TodoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 1, task: '吃饭', complete: false},
        {id: 2, task: '睡觉', complete: false},
        {id: 3, task: '打豆豆', complete: true}
      ]
    };
  }

  handleToggleComplete(taskId) {
    let data = this.state.data;
    let task = data[taskId - 1];
    task.complete = !task.complete;

    this.setState({
      data: data
    });
  }

  handleDeleteTask(taskId) {
    var data = this.state.data;
    data.splice(taskId - 1, 1);

    this.setState({
      data: data
    });
  }

  handleSubmitTask(taskContent) {
    var data = this.state.data;
    data.push({
      id: data.length+1,
      task: taskContent,
      complete: false
    });

    this.setState({
      data: data
    });
  }

	render() {
		return (
      <div className="box">
        <h1 className="title">My ToDo</h1>
  			<TodoList
          list={this.state.data}
          toggleComplete={this.handleToggleComplete.bind(this)}
          deleteTask={this.handleDeleteTask.bind(this)}
        />
  			<TodoForm submitTask={this.handleSubmitTask.bind(this)}/>
  		</div>
    );
	}
}

class TodoList extends Component {
	render() {
    var list = this.props.list,
        hasCompleteCount = 0;

    var taskList = list.map((value) => {
      if(value.complete) {
        hasCompleteCount++;
      }

      return (
        <TodoItem
          key={value.id}
          taskId={value.id}
          task={value.task}
          complete={value.complete}
          toggleComplete={this.props.toggleComplete.bind(this)}
          deleteTask={this.props.deleteTask.bind(this)}
        />
      );
    });

		return (
      <div className='list'>
        <ul>
          {taskList}
        </ul>  
        <TodoFooter
          hasCompleteCount={hasCompleteCount}
          total={list.length}
        />
      </div>
    );
	}
}

class TodoItem extends Component {
  toggleComplete() {
    this.props.toggleComplete(this.props.taskId);
  }

  deleteTask() {
    this.props.deleteTask(this.props.taskId);
  }

	render() {
    let complete = this.props.complete;
    let task = this.props.task;

		return (
      <li className={"taskCheckbox" + (complete?" complete":"")}>
        <input
          type="checkbox"
          id={"taskCheckbox"+this.props.taskId}
          onChange={this.toggleComplete.bind(this)}
          checked={complete}
        />
        <label htmlFor={"taskCheckbox"+this.props.taskId}></label>
        <span>
          {
            complete? <s>{task}</s>: task
          }
        </span>
        <button
          onClick={this.deleteTask.bind(this)}
          className="deleteBtn"
        >DELETE</button>
      </li>
    );
	}
}

class TodoFooter extends Component {
	render() {
		return (
      <div className="completeProgress">已完成 {this.props.hasCompleteCount}/{this.props.total}</div>
    );
	}
}

class TodoForm extends Component {
  submitTask(e) {
    e.preventDefault();
    let content = ReactDOM.findDOMNode(this.refs.task).value.trim();
    if(!content) {
      return;
    }

    this.props.submitTask(content);
    ReactDOM.findDOMNode(this.refs.task).value = '';
  }

	render() {
		return (
      <form
        onSubmit={this.submitTask.bind(this)}
        className="addForm"
      >
        <input type="text" ref="task" className="addContent"/>
        <input
          type="submit"
          value="Add"
          placeholder="你想做点什么"
          className="addBtn"
        />
      </form>
    );
	}
}

export default TodoBox;