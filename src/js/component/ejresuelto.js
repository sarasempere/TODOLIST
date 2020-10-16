//first of all is necesary read the documentation that you could find here:
//             https://assets.breatheco.de/apis/fake/todos/
// in this Todo list  the main porpuse is creating a list of duties for each user
// we send to the server.
import React from "react";
export class Home extends React.Component {
	constructor() {
		//declaring variables which could be useful in my api manipulation
		super();
		this.state = {
			contacts: [],
			input: "",
			userName: ""
		};
	}
	//this method will send the list of items to the server and aftr that
	//add a new item in the list
	addListItems = e => {
		//in this case we are working with the Enter key so
		// we are exoecting the user clicks this Key,
		//if it is not the case we do nothing.
		let key = e.which || e.keyCode || 0;
		if (key !== 13) {
			return;
		} else {
			let newContacts = this.state.contacts;
			let newObject = { label: this.state.input, done: false };
			newContacts.push(newObject);
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/" +
					this.state.userName,
				{
					method: "PUT",
					body: JSON.stringify(newContacts),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(newRes => newRes.text())
				.then(response => {
					this.setState({
						contacts: newContacts,
						input: ""
					});
				})
				.catch(error => console.log("Error:", error));
		}
	};
	//this method will send the list of items to the server and will delete the proper item
	deleteListItems = index => {
		let updatedContacts = this.state.contacts;
		updatedContacts[index].done = true;
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" +
				this.state.userName,
			{
				method: "PUT",
				body: JSON.stringify(updatedContacts),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(newRes => newRes.text())
			.then(response => {
				this.setState({
					contacts: updatedContacts
				});
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};
	updateUserName = e => {
		let key = e.which || e.keyCode || 0;
		if (key !== 13) {
			return;
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/" +
					this.state.userName
			)
				.then(newRes => newRes.json())
				.then(nob => {
					if (Array.isArray(nob) === true) {
						this.setState({ contacts: nob });
					} else {
						fetch(
							"https://assets.breatheco.de/apis/fake/todos/user/ " +
								this.state.userName,
							{
								method: "POST",
								body: JSON.stringify([]),
								headers: {
									"Content-Type": "application/json"
								}
							}
						).then(() => this.setState({ contacts: [] }));
					}
				});
		}
	};
	render() {
		return (
			<div className="fullPage">
				<div className="header">
					<h1>todos</h1>
				</div>
				<div className="userNameChanger">
					<div className="userNameLabel">
						<h3>Username:</h3>
					</div>
					<div className="userNameInput">
						<input
							id="addUser"
							type="text"
							placeholder="What is your username?"
							onKeyPress={this.updateUserName}
							value={this.state.userName}
							onChange={e =>
								this.setState({ userName: e.target.value })
							}
						/>
					</div>
				</div>
				<div className="container">
					<input
						id="addItem"
						type="text"
						placeholder="What needs to be done?"
						onKeyPress={this.addListItems}
						value={this.state.input}
						onChange={e => this.setState({ input: e.target.value })}
					/>
					<ul>
						{this.state.contacts.map((item, index) => {
							return (
								<li className="flexItems" key={index}>
									<div className="listItem">
										{item.label} {item.done && "- Done"}
									</div>
									<div className="deleter">
										<span
											onClick={() =>
												this.deleteListItems(index)
											}>
											x
										</span>
									</div>
								</li>
							);
						})}
						<li id="counter">
							{this.state.contacts.length === 1
								? this.state.contacts.length + "total item"
								: this.state.contacts.length + "total items"}
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
