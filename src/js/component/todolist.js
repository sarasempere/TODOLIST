import React from "react";
//TODOLIST SIN API
//import Item from "./item.js";

export class Todolist extends React.Component {
	constructor() {
		super();
		this.state = {
			tareas: [{ id: Math.random() * 10, title: "Algo" }],
			item: ""
		};

		this.itemChange = this.itemChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	itemChange(e) {
		let valor = e.target.value;
		this.setState({
			item: { id: Math.random() * 10, title: valor }
		});
	}

	limpiar() {
		document.querySelector(".entryTxt").value = "";
	}

	addItem(e) {
		e.preventDefault();
		this.setState(prevState => ({
			tareas: [...prevState.tareas, this.state.item]
		}));
		this.setState({ item: "" });
		this.limpiar();
	}

	removeItem(id) {
		this.setState({
			tareas: this.state.tareas.filter(tarea => tarea.id != id)
		});
	}

	render() {
		let newtar = this.state.tareas.map(tarea => {
			return (
				<li key={tarea.id}>
					<div>
						<label>{tarea.title}</label>
						<button
							className="destroy"
							value="destroy"
							onClick={() => this.removeItem(tarea.id)}
						/>
					</div>
				</li>
			);
		});
		return (
			<div>
				<input
					className="entryTxt"
					value={this.state.item.title}
					onChange={e => this.itemChange(e)}
				/>
				<button onClick={this.addItem}>Add</button>

				<div>
					<ul>{newtar}</ul>
				</div>
			</div>
		);
	}
}
