import React, {PureComponent} from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

	constructor(props) {
		super(props);
		console.log('[App.js] Inside Constructor', props);
		this.state = {
			persons: [
				{id: 'ldkfjg', name: "Max", age: 28},
				{id: 'perotkf', name: "Manu", age: 29},
				{id: 'cvmbk', name: "Stephanie", age: 26}
			],
			showPersons: false,
			toggleClicked: 0,
			authenticated: false
		}
	}

	/*componentWillMount() {
		console.log('[App.js] Inside componentWillMount()')
	}*/

	componentDidMount() {
		console.log('[App.js] Inside componentDidMount()')
	}

	//shouldComponentUpdate(nextProps, nextState) {
	//	console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
	//  return nextProps.persons !== this.props.persons ||
	//  nextProps.showPersons !== this.props.showPersons;
	//	return true;
	//}

	/*componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
	}*/

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('[UPDATE App.js] Inside getDerivedStateFromProps()', nextProps, prevState);
		return prevState;
	}

	getSnapshotBeforeUpdate(){
		console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate()');
		return null;
	}

	componentDidUpdate() {
		console.log('[UPDATE App.js] Inside componentDidUpdate()');
	}

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
		this.setState((prevState, props) => {
			return {
				showPersons: !doseShow,
				toggleClicked: prevState.toggleClicked + 1
			};
		})
	};

	loginHandler = () => {
		this.setState({
			authenticated: true
		})
	};

	render() {
		console.log('[App.js] Inside render()');
		let persons = null;

		if (this.state.showPersons) {
			persons =
				<Persons persons={this.state.persons}
						 clicked={this.deletePersonHandler}
						 changed={this.nameChangeHandler}/>
		}

		return (
			<Aux>
				<button onClick={() => {
					this.setState({showPersons: true})
				}}>Show Persons
				</button>
				<Cockpit showPersons={this.state.showPersons}
						 persons={this.state.persons}
						 login={this.loginHandler}
						 clicked={this.togglePersonHandler}/>
				<AuthContext.Provider value={this.state.authenticated}>
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
	}
}

export default withClass(App, classes.App);
