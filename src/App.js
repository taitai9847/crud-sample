import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        {
          id: 1,
          body: "とりあえず表示してみる"
        },
        {
          id: 2,
          body: "私たち、いずれ書き換えられる運命"
        }
      ]
    }
    this.changeText = this.changeText.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.fetchTasks = this.fetchTasks.bind(this)
  }

  componentWillMount(){
    this.fetchTasks()
  }

  putTask(taskId) {
    fetch("http://localhost:3002/tasks/"+taskId, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: "やったよ" })
    })
    .then( this.fetchTasks )
  }

  deleteTask(taskId) {
    fetch("http://localhost:3002/tasks/"+taskId, {
      method: "DELETE"
    })
    .then( this.fetchTasks )
  }

  fetchTasks(){
    fetch("http://localhost:3002/tasks") 
    .then( response => response.json() ) 
    .then( json => { 
      this.setState({ tasks: json }) 
    })
  }

  changeText(e) {
    const inputText = e.target.value
    this.setState({ inputText: inputText })
    console.dir(inputText);
  }

  submitTask() {
    fetch("http://localhost:3002/tasks", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: this.state.inputText })
    })
    .then( this.fetchTasks )
  }

  render() {
    return (
      <div className="App">
        <div className="tasks">
        {
          this.state.tasks.map( task => {
              return (
                <div className="task" key={ task.id }>
                  { task.body }
                  <button className="put" onClick={ ()=>{ this.putTask(task.id) } }>put</button>
                  <button className="delete" onClick={ ()=>{ this.deleteTask(task.id) } }>delete</button>
                </div>
              )
          })
        }
        </div>
        <div id="task-form">
          <input type="text" onChange={ this.changeText }/>
          <button onClick={ this.submitTask }>submit</button>
        </div>
      </div>
    );
  }
}

export default App;