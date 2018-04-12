import React, {Component} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

	constructor(props) {
		super(props);
	}

	state = {
		persons: [
			{id: 'ldkfjg', name: "Max", age: 28},
			{id: 'perotkf', name: "Manu", age: 29},
			{id: 'cvmbk', name: "Stephanie", age: 26}
		],
		showPersons: false
	};

	nameChangeHandler = (event, id) => {

		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		person.name = event.target.value;
		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({
			persons: persons
		})
	};

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({
			persons: persons
		})
	};

	togglePersonHandler = () => {
		const doseShow = this.state.showPersons;
		this.setState({
			showPersons: !doseShow
		})
	};

	render() {
		let persons = null;

		if (this.state.showPersons) {
			persons =
				<Persons persons={this.state.persons}
						 clicked={this.deletePersonHandler}
						 changed={this.nameChangeHandler}/>
		}

		return (
			<div className={classes.App}>
				<Cockpit showPersons={this.state.showPersons}
						 persons={this.state.persons}
						 clicked={this.togglePersonHandler}/>
				{persons}
			</div>
		);
	}
}

export default App;
