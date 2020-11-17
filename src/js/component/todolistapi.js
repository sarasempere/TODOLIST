import React, { useState, useEffect } from "react";
const Todolist = () => {
	const [toDos, setToDos] = useState([]);
	const [input, setInput] = useState();
	//the following useEffect hook will run only once
	useEffect(() => {
		initTodos();
	}, []);
	const initTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ssm", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				setToDos(data);
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
		//using the fetch() api, write code to fetch data from API, upon resolved Promise, initialize toDos (state)
		//by using it's setter function (setToDos) -- see line 4
		//delete the following 2 lines - this is just to get you started with an initial value of items;
		// const defaultList = ["Walk the dog"];
		// setToDos(defaultList);
	};
	// addTask method is 1/2 way there - you need to hook it up with the API, so the values that are being changed (locally) also get updated (remotely)
	// you'll also need to write code to delete items from the list and update the tasks on the API
	//Following will add tasks to toDos by updating it's state value
	const addTask = e => {
		if (e.keyCode === 13) {
			const task = e.target.value.trim();
			const newList = [...toDos, { label: task, done: false }];
			console.log(newList);
			e.target.value = ""; //this is re-setting the value of the input text
			fetch("https://assets.breatheco.de/apis/fake/todos/user/ssm", {
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(() => initTodos());
		}
	};
	const deleteTask = i => {
		const filteredToDos = toDos.filter(
			(arrayElement, arrayIndex) => i !== arrayIndex
		);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ssm", {
			method: "PUT",
			body: JSON.stringify(filteredToDos),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => initTodos());
	};
	//component still needs a way to remove the items
	//make it work!
	return (
		<div className="container flex">
			<div className="head flex">
				<h1>to dos</h1>
			</div>
			<div className="body">
				<input
					className="flex"
					type="text"
					placeholder="Add a task"
					name="task"
					onKeyDown={addTask}
					onChange={e => setInput(e.target.value)}
				/>
				<ul>
					{toDos.map((arrayElement, arrayIndex) => {
						return (
							<li key={arrayIndex} className="flex">
								{arrayElement.label}
								<i
									className="far fa-trash-alt"
									onClick={() => deleteTask(arrayIndex)}
								/>
							</li>
						);
					})}
				</ul>
				<p>{toDos.length} items left</p>
			</div>
			<div className="footer flex">
				<div className="blank-bottom1 flex" />
				<div className="blank-bottom2 flex" />
				<div className="blank-bottom3 flex" />
			</div>
		</div>
	);
};
export { Todolist as default };
