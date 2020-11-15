import React from "react";
//TODOLIST CON API
//import Item from "./item.js";

export class Todolist extends React.Component {
	constructor() {
		super();
		this.state = {
			tareas: [
				{
					label: "Hacer la cama",
					done: false
				}
			],
			item: ""
		};

		this.tareas = [];

		this.itemChange = this.itemChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ssm", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
				//this.setState({ tareas: data });
				this.tareas = data;
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}

	itemChange(e) {
		let valor = e.target.value;
		this.setState({
			item: { label: valor, done: false }
		});
	}

	/*itemChange(e) {
		let valor = e.target.value;
		let newTarea = { label: valor, done: false };
	}*/

	limpiar() {
		document.querySelector(".entryTxt").value = "";
	}

	addItem() {
		const urlApi = "https://assets.breatheco.de/apis/fake/todos/user/ssm";
		const tareas = this.setState(prevState => ({
			tareas: [...prevState.tareas, this.state.item]
		}));

		/*let newTarea = {
			label: document.querySelector("#label").value,
			done: false
		};
		const tareas = this.tareas.push(newTarea);*/

		const opts = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tareas)
		};
		fetch(urlApi, opts)
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
			})
			.then(data => {
				alert(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
		this.limpiar();
	}

	removeItem(id) {
		const urlApi = "https://assets.breatheco.de/apis/fake/todos/user/ssm";
		const tareas = this.setState({
			tareas: this.state.tareas.filter((tarea, index) => {
				return index != id;
			})
		});

		const opts = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tareas)
		};
		fetch(urlApi, opts)
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
			})
			.then(data => {
				alert(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		let newtar = this.tareas.map((tarea, index) => {
			return (
				<li key={index}>
					<div>
						<label>{tarea.label}</label>
						<button
							className="destroy"
							value="destroy"
							onClick={() => this.removeItem({ index })}
						/>
					</div>
				</li>
			);
		});
		return (
			<div>
				<input
					className="entryTxt"
					id="label"
					name="label"
					type="text"
					//onChange={e => this.itemChange(e)}
				/>
				<button onClick={this.addItem}>Add</button>

				<div>
					<ul>{newtar}</ul>
				</div>
			</div>
		);
	}
}