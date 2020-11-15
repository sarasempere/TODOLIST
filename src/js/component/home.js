import React from "react";
//EJERCICIO DE CLASE
//include images into your bundle
//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: [
				{ done: false, title: "Make The bed", id: Math.random() * 10 },
				{ done: false, title: "Wash my hands", id: Math.random() * 10 },
				{ done: false, title: "Eat", id: Math.random() * 10 }
			],
			newTask: ""
		};
	}
	addTask(e) {
		//console.log(Creating task with title:, this.state.newTask);
		e.preventDefault();
		this.setState({
			todos: this.state.todos.concat([
				{
					done: false,
					title: this.state.newTask,
					id: Math.random() * 10
				}
			]),
			newTask: ""
		});
		return false;
	}
	removeTask(taskId) {
		this.setState({
			todos: this.state.todos.filter(task => task.id != taskId)
		});
	}
	render() {
		let TasksToRender = this.state.todos.map(task => {
			return (
				<li key={task.id}>
					<div className="view">
						<label>{task.title}</label>
						<button
							className="destroy"
							value="destroy"
							onClick={() => this.removeTask(task.id)}
						/>
					</div>
				</li>
			);
		});
		return (
			<div>
				<section className="todoapp">
					<header className="header">
						<h1>TODOS</h1>
					</header>
					<form onSubmit={this.addTask.bind(this)}>
						<input
							className="new-todo"
							value={this.state.newTask}
							type=""
							onChange={evt =>
								this.setState({
									newTask: evt.target.value
								})
							}
						/>
					</form>
				</section>
				<section className="main">
					<ul className="todo-list">{TasksToRender}</ul>
				</section>
			</div>
		);
	}
}
